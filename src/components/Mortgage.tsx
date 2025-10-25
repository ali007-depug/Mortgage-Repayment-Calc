import { useState } from "react";
import Form from "./Form";
import Result from "./Result";

export interface MortgageData {
  amount: string;
  team: string;
  rate: string;
  type: string;
}
export interface ErrStat {
  amount: string | null;
  team: string | null;
  rate: string | null;
  type: string | null;
}

export interface resultProp {
  monthly: number;
  total: number;
}
export default function Mortgage() {
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState<MortgageData>({
    amount: "",
    team: "",
    rate: "",
    type: "",
  });

  const [errStat, setErrStat] = useState<ErrStat>({
    amount: null,
    team: null,
    rate: null,
    type: null,
  });

  const [resutl, setResult] = useState<resultProp>({ monthly: 0, total: 0 });

  const handelCalc = () => {
    // check the field is not empty
    if (
      formData.amount !== "" &&
      formData.rate !== "" &&
      formData.team !== "" &&
      formData.type !== ""
    ) {
      // open the result
      setShowResult(true);
      //   calc the monthtly repayment
      const amount = parseFloat(formData.amount);
      const years = parseFloat(formData.team);
      const rate = parseFloat(formData.rate) / 100 / 12;
      const payments = years * 12;

      const monthly =
        (amount * (rate * Math.pow(1 + rate, payments))) /
        (Math.pow(1 + rate, payments) - 1);

      const totalRepayment = monthly * payments;

      setResult({ monthly: monthly, total: totalRepayment });
    } else {
      // show error for empty fields
      setErrStat({
        amount: formData.amount === "" ? "This field is required" : null,
        team: formData.team === "" ? "This field is required" : null,
        rate: formData.rate === "" ? "This field is required" : null,
        type: formData.type === "" ? "This field is required" : null,
      });
    }
  };

  return (
    <section className="flex max-sm:flex-col max-sm:mx-auto gap-5 bg-white sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl shadow-lg overflow-hidden w-3/4">
      {/* form */}
      <Form
        data={formData}
        onChange={setFormData}
        errStat={errStat}
        onError={setErrStat}
        setShowResult={setShowResult}
        onCalc={handelCalc}
      />
      {/* Result */}
      <Result result={resutl} showResult={showResult} />
    </section>
  );
}
