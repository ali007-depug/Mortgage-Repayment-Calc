import type { resultProp } from "./Mortgage";

interface ResultProps {
  showResult?: boolean;
  result: resultProp;
}
export default function Result({ showResult, result }: ResultProps) {
  return (
    <section
      className={`sm:w-1/2 bg-s-900 max-sm:py-5 px-8  sm:rounded-bl-[80px] ${
        !showResult ? "flex justify-center" : ""
      }`}
    >
      {!showResult ? <Empty /> : <AcutalResult result={result} />}
    </section>
  );
}

function Empty() {
  return (
    <div className="flex items-center justify-center flex-col">
      <img src="illustration-empty.svg" alt="empty calc icon" />
      {/* text */}
      <p className="text-white font-semibold my-5">Result Shown here</p>
      {/* desc */}
      <p className="text-s-700 text-center">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

function AcutalResult({ result }: ResultProps) {
  return (
    <section className="mt-5">
      {/* text */}
      <h1 className="text-white font-semibold my-2">Your results</h1>
      {/* desc */}
      <p className="text-s-500 text-sm mb-4">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      {/* card */}
      <div className="bg-s-900 shadow-lg rounded border-t-2 border-t-Lime overflow-hidden p-6">
        {/* monthly repayments */}
        <p className="pb-8 border-b border-b-lime-200 flex flex-col gap-3">
          <span className="text-s-500">Your monthly repayments</span>
          <span className="text-Lime font-bold text-2xl">
            £{result.monthly.toFixed(2)}
          </span>
        </p>
        {/* total */}
        <p className="flex flex-col mt-2 gap-3">
          <span className="text-s-500">Total you'll repay over the term</span>
          <span className="text-white">£{result.total.toFixed(2)}</span>
        </p>
      </div>
    </section>
  );
}
