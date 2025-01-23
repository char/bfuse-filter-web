use std::{
    collections::BTreeSet,
    hash::{DefaultHasher, Hash, Hasher},
};

use js_sys::{Array, Uint8Array};
use wasm_bindgen::prelude::*;
use xorf::{BinaryFuse8, Filter};

#[wasm_bindgen]
pub fn generate(features: &Array) -> JsValue {
    let features = features
        .iter()
        .filter_map(|x| x.as_string())
        .collect::<BTreeSet<_>>();

    if features.is_empty() {
        return JsValue::undefined();
    }

    let hashed_features = features.iter().map(|s| {
        let mut hasher = DefaultHasher::default();
        s.hash(&mut hasher);
        hasher.finish()
    });
    let Ok(filter) = BinaryFuse8::try_from_iterator(hashed_features) else {
        return JsValue::undefined();
    };
    let Ok(serialized_filter) = postcard::to_stdvec(&filter) else {
        return JsValue::undefined();
    };

    let bytes = Uint8Array::new_with_length(serialized_filter.len().try_into().unwrap());
    bytes.copy_from(&serialized_filter);
    JsValue::from(bytes)
}

#[wasm_bindgen]
pub fn check(filter: Uint8Array, feature: String) -> JsValue {
    let filter = filter.to_vec();
    let filter: BinaryFuse8 = match postcard::from_bytes(&filter) {
        Ok(x) => x,
        _ => return JsValue::undefined(),
    };

    let mut hasher = DefaultHasher::default();
    feature.hash(&mut hasher);
    JsValue::from_bool(filter.contains(&hasher.finish()))
}
