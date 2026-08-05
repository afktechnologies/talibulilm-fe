"use client";
import React, { useState, useEffect } from "react";
import { primary_font, roboto } from "@/app/font/font";
import InputGroup from "../common/Inputs/inputGroup";

const nisabThreshold = 56520; // Nisab threshold in Indian Rupees

const mc = {
  wrapper: "flex justify-center py-12 px-4",
  container: "w-full max-w-[900px] flex flex-col justify-center",
  heading: "text-center mb-10",
  h2: "text-[2.4rem] text-[#5C6357] max-md:text-[1.6rem]",
  p: "text-[#7D887A] text-sm mt-2",
  pSpan: "text-[#5C6357] font-medium",
  formContainer: "bg-white border border-[#C2CDD3] rounded-2xl p-6 md:p-8 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]",
  title: "text-[1.3rem] text-[#5C6357] mb-5 pb-3 border-b border-[#C2CDD3] flex items-center gap-2",
  titleAccent: "w-1.5 h-6 rounded-full bg-[#DBB346] inline-block",
  form: "grid grid-cols-1 sm:grid-cols-2 gap-6",
  resultCard: "bg-[#003049] rounded-2xl p-6 md:p-8",
  resultRow: "flex flex-col sm:flex-row gap-6 sm:gap-0 sm:items-center sm:justify-between",
  resultBlock: "flex flex-col gap-1",
  resultLabel: "text-white/60 text-sm uppercase tracking-wide",
  resultValue: "text-white text-[1.8rem] font-semibold",
  resultDivider: "hidden sm:block w-px self-stretch bg-white/15",
  warning: "text-[#DBB346] text-sm mt-3 bg-white/5 rounded-lg px-4 py-3",
};

const MainCalculator = () => {
  const [gold, setGold] = useState("");
  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [property, setProperty] = useState("");
  const [debts, setDebts] = useState("");
  const [total, setTotal] = useState(0);
  const [zakat, setZakat] = useState(0);
  const [warning, setWarning] = useState("");

  const isFloat = (value: string) => /^(\d+(\.\d{0,2})?)?$/.test(value);

  const handleInput =
    (setter: (val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (isFloat(val)) setter(val);
    };

  useEffect(() => {
    const owned =
      parseFloat(gold || "0") +
      parseFloat(cash || "0") +
      parseFloat(bank || "0") +
      parseFloat(property || "0");

    const liabilities = parseFloat(debts || "0");
    const net = owned - liabilities;

    setTotal(net > 0 ? net : 0);

    if (net >= nisabThreshold) {
      const calculatedZakat = +(net * 0.025).toFixed(2);
      setZakat(calculatedZakat);
      setWarning("");
    } else {
      setZakat(0);
      if (net > 0) {
        setWarning(
          "Zakat is not due as your total wealth is below the Nisab threshold."
        );
      } else {
        setWarning("");
      }
    }
  }, [gold, cash, bank, property, debts]);

  return (
    <div className={mc.wrapper}>
      <div className={mc.container}>
        <div className={mc.heading}>
          <h2 className={`${primary_font.className} ${mc.h2}`}>Zakat Calculator</h2>
          <p className={`${roboto.className} ${mc.p}`}>
            Enter all assets that have been in your possession over a year{" "}
            <span className={mc.pSpan}>(in Indian Rupees)</span>
          </p>
        </div>

        {/* What You Own */}
        <div className={mc.formContainer}>
          <h4 className={`${mc.title} ${primary_font.className}`}>
            <span className={mc.titleAccent} />
            What You Own
          </h4>
          <form className={mc.form}>
            <InputGroup
              label="Value of Gold & Silver you have"
              value={gold}
              onChange={handleInput(setGold)}
              placeholder="e.g. 50000"
            />
            <InputGroup
              label="Cash at home"
              value={cash}
              onChange={handleInput(setCash)}
              placeholder="e.g. 10000"
            />
            <InputGroup
              label="Bank Balance"
              value={bank}
              onChange={handleInput(setBank)}
              placeholder="e.g. 25000"
            />
            <InputGroup
              label="Value of Goods & Properties"
              value={property}
              onChange={handleInput(setProperty)}
              placeholder="e.g. 30000"
            />
          </form>
        </div>

        {/* Minus Liabilities */}
        <div className={mc.formContainer}>
          <h4 className={`${mc.title} ${primary_font.className}`}>
            <span className={mc.titleAccent} />
            Minus Liabilities
          </h4>
          <form className={mc.form}>
            <InputGroup
              label="Total repayable Loans/Debts you have"
              value={debts}
              onChange={handleInput(setDebts)}
              placeholder="e.g. 10000"
            />
          </form>
        </div>

        {/* Calculated Result */}
        <div className={mc.resultCard}>
          <div className={mc.resultRow}>
            <div className={mc.resultBlock}>
              <span className={`${roboto.className} ${mc.resultLabel}`}>Total Net Value</span>
              <span className={`${primary_font.className} ${mc.resultValue}`}>
                ₹{total.toLocaleString()}
              </span>
            </div>
            <div className={mc.resultDivider} />
            <div className={mc.resultBlock}>
              <span className={`${roboto.className} ${mc.resultLabel}`}>Your Zakat Due</span>
              <span className={`${primary_font.className} ${mc.resultValue}`}>
                {warning ? "₹0" : `₹${zakat.toLocaleString()}`}
              </span>
            </div>
          </div>
          {warning && <p className={`${roboto.className} ${mc.warning}`}>{warning}</p>}
        </div>
      </div>
    </div>
  );
};

export default MainCalculator;
