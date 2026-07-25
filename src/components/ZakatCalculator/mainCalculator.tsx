"use client";
import React, { useState, useEffect } from "react";
import { primary_font, roboto } from "@/app/font/font";
import InputGroup from "../common/Inputs/inputGroup";

const nisabThreshold = 56520; // Nisab threshold in Indian Rupees

const mc = {
  wrapper: "flex justify-center my-12",
  container: "w-full max-w-[1440px] flex flex-col justify-center",
  h2: "text-[3rem] text-[#5C6357] max-md:text-[1.5rem]",
  p: "text-[#488EAD]",
  pSpan: "text-[#5C6357] text-[1.1rem] max-md:text-[1rem]",
  formContainer: "relative border border-[#ccc] p-8 mt-20 mr-2 mb-8 ml-2 rounded max-md:p-2 max-md:mt-20 max-md:mr-4 max-md:mb-0 max-md:ml-4",
  title: "absolute top-[-1.75rem] left-20 bg-white py-0 px-2 text-[#DBB346] z-[1] text-[2rem] max-md:top-[-1rem] max-md:left-6 max-md:text-[1.2rem]",
  form: "flex flex-col gap-8 m-8",
  inputGroup: "flex flex-col",
  inputGroupLabel: "mb-1 text-[#7D887A] text-[1.5rem] max-md:text-[1rem]",
  inputGroupInput: "p-2 border-none border-b border-b-[#ccc] bg-transparent outline-none text-[1.5rem] text-[#77A6A1] max-md:text-[1rem] placeholder:text-[#C2CDD3] placeholder:text-[1.2rem] max-md:placeholder:text-[1rem]",
  inputGroupP: "text-[#7A604F] text-[1.8rem] mt-[0.3rem] font-medium",
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
        <div>
          <h2 className={`${primary_font.className} ${mc.h2}`}>Zakat Calculator</h2>
          <p className={`${roboto.className} ${mc.p}`}>
            Enter all assets that have been in your possession over a year{" "}
            <span className={mc.pSpan}>(in Indian Rupees)</span>
          </p>

          {/* What You Own */}
          <div className={mc.formContainer}>
            <h4 className={`${mc.title} ${primary_font.className}`}>
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
          <div className={mc.formContainer}>
            <h4 className={`${mc.title} ${primary_font.className}`}>
              Your Calculated Net Value
            </h4>
            <form className={mc.form}>
              <div className={mc.inputGroup}>
                <label className={mc.inputGroupLabel}>Total Value</label>
                <input value={total.toLocaleString()} readOnly className={mc.inputGroupInput} />
              </div>
              <div className={mc.inputGroup}>
                <label className={mc.inputGroupLabel}>Your Zakat</label>
                {!warning ? (
                  <input value={zakat.toLocaleString()} readOnly className={mc.inputGroupInput} />
                ) : (
                  <p className={mc.inputGroupP}> &quot;{warning} &quot;</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCalculator;
