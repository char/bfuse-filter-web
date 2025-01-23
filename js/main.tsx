import "https://char.lt/esm/pipe.ts";

import { check, generate } from "./xor_filter.ts";

import * as base32 from "@mary/base32";

const filterToString = (f: Uint8Array | undefined) =>
  f?.pipe(base32.encode) ?? "[No filter]";
const stringToFilter = (s: string): Uint8Array => s.pipe(base32.decode);

const main = document.body.querySelector("main")!;

const onClick = (f: () => void) => (b: HTMLButtonElement) =>
  b.addEventListener("click", f);
const onSubmit = (f: () => void) => (form: HTMLFormElement) =>
  form.addEventListener("submit", (e) => (e.preventDefault(), f()));

// deno-lint-ignore prefer-const
let checker: Element, generator: Element;
checker = (
  <section>
    <header>
      <h1>binary fuse filter checker</h1>

      <button
        _tap={onClick(() => {
          checker.remove();
          main.append(generator);
        })}
      >
        generator
      </button>
    </header>

    <div className="explainer">
      <p>
        binary fuse filters are compact probabilistic data structures that can
        determine whether an element is <em>potentially</em> or{" "}
        <em>definitely not</em> contained in a set. i.e. there are no
        false-negatives but there may be false-positives.
      </p>

      <p>
        enter somebody's <em>filter code</em> below and an entry to exactly
        match.
        <br />
        you may need more information, such as the format of the entries.
      </p>
    </div>

    <form _tap={onSubmit(checkFilter)}>
      <textarea placeholder="filter code" rows={3} required></textarea>
      <input type="text" required placeholder="[entry to test]" />
      <button role="submit">check</button>
    </form>
  </section>
);

const potentiallyInSet = (
  <div className="result match">
    this element is a <strong>match!</strong>
    {` `}
    that means it may <em>potentially</em> be in the original set.
  </div>
);
const notInSet = (
  <div className="result not-match">
    this element is <strong>not a match.</strong>
    {` `}
    that means that it is definitely not in the original set.
  </div>
);

function checkFilter() {
  potentiallyInSet.remove();
  notInSet.remove();

  const filter = checker
    .querySelector("textarea")!
    .value.pipe((s) => s.trim())
    .pipe(stringToFilter);
  const entry = checker.querySelector("input")!.value;

  checker.append(check(filter, entry) ? potentiallyInSet : notInSet);
}

generator = (
  <section>
    <header>
      <h1>binary fuse filter generator</h1>

      <button
        _tap={onClick(() => {
          generator.remove();
          main.append(checker);
        })}
      >
        checker
      </button>
    </header>

    <form _tap={onSubmit(generateFilter)}>
      <textarea placeholder={`entry a\nentry b\nentry c`} rows={8} required />
      <button role="submit">generate</button>
      <pre className="generation-output">[no filter]</pre>
    </form>
  </section>
);

function generateFilter() {
  const lines = generator
    .querySelector("textarea")!
    .value.split("\n")
    .filter((s) => s.length);
  generator.querySelector("pre")!.textContent =
    generate(lines).pipe(filterToString);
}

main.append(checker);
