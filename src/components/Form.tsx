import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ErrStat, MortgageData } from "./Mortgage";
interface FormProps {
  setShowResult: (show: boolean) => void;
  data: MortgageData;
  onChange: (data: MortgageData) => void;
  errStat: ErrStat;
  onError: (stat: ErrStat) => void;
  onCalc: () => void;
}

export default function Form({
  data,
  onChange,
  errStat,
  onError,
  setShowResult,
  onCalc,
}: FormProps) {
  const handleChange = (field: keyof MortgageData, value: string) => {
    onChange({ ...data, [field]: value });
    onError({ ...errStat, [field]: null });
  };

  const clear = () => {
    // close the result
    setShowResult(false);
    // change form data to default
    onChange({ amount: "", team: "", rate: "", type: "" });
  };

  return (
    <Card className="sm:w-1/2 border-none shadow-none">
      {/* header */}
      <CardHeader className="flex  max-sm:flex-col sm:items-center-safe sm:justify-between">
        <CardTitle className="text-xl  text-slate-800 font-[600]">
          Mortgage Calculator
        </CardTitle>
        <CardAction className=" sm:self-center ">
          <Button
            onClick={clear}
            className="cursor-pointer text-sm text-slate-500 underline"
            variant="ghost"
          >
            Clear All
          </Button>
        </CardAction>
      </CardHeader>
      {/* content */}
      <CardContent>
        <form>
          {/* amount */}
          <div className="flex gap-2 flex-col my-2">
            <Label className="text-s-500 text-sm" htmlFor="amount">
              Mortgage Amount
            </Label>
            {/* input + £ */}
            <div className="relative mt-1 overflow-hidden rounded ">
              <Input
                type="number"
                id="amount"
                required
                placeholder=""
                className={`peer rounded pl-9 relative border focus-visible:outline-none 
                focus-visible:ring-0 z-20 focus-visible:border-Lime ${
                  errStat.amount ? "border-red-700" : "border"
                }`}
                value={data.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                aria-label="amount value"
              />
              <span
                className={`absolute  top-1/2 -translate-y-1/2  block px-3 py-2 font-bold peer-focus-visible:bg-Lime peer-focus-visible:text-black ${
                  errStat.amount
                    ? "!bg-red-600 text-white"
                    : "text-s-700 bg-s-100"
                }`}
              >
                £
              </span>
            </div>
            {/* error stata */}
            <p className="h-[15px]">
              {errStat.amount !== null && <ErrMsg msg={errStat.amount} />}
            </p>
          </div>
          {/* team + rate */}
          <div className="flex max-sm:flex-col max-sm:gap-1 gap-3 my-2">
            {/* team */}
            <div className="flex gap-2 flex-col">
              <Label htmlFor="team" className="text-s-500 text-sm ">
                Mortgage Team
              </Label>
              {/* input */}
              <div className="relative overflow-hidden rounded">
                <Input
                  type="number"
                  id="team"
                  required
                  className={`h-10 peer rounded pl-9 relative border focus-visible:outline-none 
                focus-visible:ring-0 z-20 focus-visible:border-Lime ${
                  errStat.team ? "border-red-700" : "border"
                }`}
                  value={data.team}
                  onChange={(e) => handleChange("team", e.target.value)}
                  aria-label="team value"
                ></Input>
                <span
                  className={`absolute right-0 top-1/2 -translate-y-1/2  block px-3 py-2 font-bold peer-focus-visible:bg-Lime peer-focus-visible:text-black ${
                    errStat.team
                      ? "!bg-red-600 text-white"
                      : "text-s-700 bg-s-100"
                  }`}
                >
                  years
                </span>
              </div>
              <p className="h-[15px]">
                {errStat.team !== null && <ErrMsg msg={errStat.team} />}
              </p>
            </div>
            {/* rate */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="rate" className="text-s-500 text-sm">
                Interset Rate
              </Label>
              {/* input */}
              <div className="relative overflow-hidden rounded">
                <Input
                  type="number"
                  id="rate"
                  required
                  className={`h-10 peer rounded pl-9 relative border focus-visible:outline-none 
                focus-visible:ring-0 z-20 focus-visible:border-Lime ${
                  errStat.rate ? "border-red-700" : "border"
                }`}
                  value={data.rate}
                  onChange={(e) => handleChange("rate", e.target.value)}
                  aria-label="rate value"
                ></Input>
                <span
                  className={`absolute right-0 top-1/2 -translate-y-1/2 block px-3 py-2 font-bold peer-focus-visible:bg-Lime peer-focus-visible:text-black ${
                    errStat.rate
                      ? "!bg-red-600 text-white"
                      : "text-s-700 bg-s-100"
                  }`}
                >
                  %
                </span>
              </div>
              <p className="h-[15px]">
                {errStat.rate !== null && <ErrMsg msg={errStat.rate} />}
              </p>
            </div>
          </div>
          {/* type */}
          <div className="flex flex-col gap-2 my-2 [&_div]:hover:border-Lime">
            <label className="text-s-500 text-sm">Mortgage Type</label>
            <div className="flex flex-col gap-2">
              {/* radio 1 */}
              <div className="flex items-center gap-3 border border-slate-500 rounded ps-5 has-[&:checked]:border-Lime ">
                <Label htmlFor="repayment" className="flex-1 cursor-pointer">
                  <Input
                    type="radio"
                    name="paymentType"
                    id="repayment"
                    required
                    value="repayment"
                    className="w-fit text-Lime"
                    onChange={(e) => handleChange("type", e.target.value)}
                    aria-label="repayment type"
                  />
                  Repayment
                </Label>
              </div>
              {/* radio 2 */}
              <div className="flex items-center gap-3 border border-slate-500 rounded ps-5  has-[&:checked]:border-Lime">
                <Label htmlFor="intersetOnly" className="flex-1 cursor-pointer">
                  <Input
                    type="radio"
                    name="paymentType"
                    id="intersetOnly"
                    required
                    value="interset only"
                    className="w-fit text-Lime"
                    onChange={(e) => handleChange("type", e.target.value)}
                    aria-label="repayment type"
                  />
                  Interest Only
                </Label>
              </div>
            </div>
            <p className="h-[15px]">
              {errStat.type !== null && <ErrMsg msg={errStat.type} />}
            </p>
          </div>
        </form>
      </CardContent>
      {/* footer */}
      <CardFooter>
        <Button
          className="bg-Lime hover:bg-Lime/70 cursor-pointer rounded-full text-s-900 font-bold sm:px-8 py-5 text-base max-sm:w-full"
          onClick={onCalc}
        >
          <img
            src="icon-calculator.svg"
            alt="calculator icon"
            className="size-5"
          />
          Calculate Repayments
        </Button>
      </CardFooter>
    </Card>
  );
}

function ErrMsg({ msg }: { msg: string }) {
  return <span className="text-red-700 text-sm">{msg}</span>;
}
