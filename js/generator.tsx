import { activeTab } from "./main.ts";
import { filterToString, onClick, onSubmit } from "./util.ts";
import { generate } from "./xor_filter.ts";

export const generator = (
  <section>
    <header>
      <h1>binary fuse filter generator</h1>

      <button _tap={onClick(() => activeTab.set("checker"))}>checker</button>
    </header>

    <form _tap={onSubmit(generateFilter)}>
      <textarea placeholder={`entry a\nentry b\nentry c`} rows={8} required />
      <button role="submit">generate</button>
      <pre className="generation-output">[no filter]</pre>
    </form>
  </section>
);

function generateFilter() {
  const input = generator.querySelector("textarea")!;
  const output = generator.querySelector("pre")!;

  const lines = input.value.split("\n").filter(s => s);
  output.textContent = generate(lines).pipe(filterToString);
}
