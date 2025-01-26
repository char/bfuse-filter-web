import { activeTab } from "./main.ts";
import { onClick, onSubmit, stringToFilter } from "./util.ts";
import { check } from "./xor_filter.ts";

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

export const checker = (
  <section>
    <header>
      <h1>binary fuse filter checker</h1>

      <button _tap={onClick(() => activeTab.set("generator"))}>generator</button>
    </header>

    <div className="explainer">
      <p>
        binary fuse filters are compact probabilistic data structures that can determine whether
        an element is <em>potentially</em> or <em>definitely not</em> contained in a set. i.e.
        there are no false-negatives but there may be false-positives.
      </p>

      <p>
        enter somebody's <em>filter code</em> below and an entry to exactly match.
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

function checkFilter() {
  potentiallyInSet.remove();
  notInSet.remove();

  const filterText = checker.querySelector("textarea")!;
  const entry = checker.querySelector("input")!;

  const filter = filterText.value.pipe(s => s.trim()).pipe(stringToFilter);

  checker.append(check(filter, entry.value) ? potentiallyInSet : notInSet);
}
