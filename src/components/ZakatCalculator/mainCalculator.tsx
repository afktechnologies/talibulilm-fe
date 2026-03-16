"use client";
import React, { useState, useEffect } from "react";
import styles from "./mainCalculator.module.css";
import { primary_font, roboto } from "@/app/font/font";
import InputGroup from "../common/Inputs/inputGroup";

const nisabThreshold = 56520; // Nisab threshold in Indian Rupees

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
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.main}>
          <h2 className={primary_font.className}>Zakat Calculator</h2>
          <p className={roboto.className}>
            Enter all assets that have been in your possession over a year{" "}
            <span>(in Indian Rupees)</span>
          </p>

          {/* What You Own */}
          <div className={styles.formContainer}>
            <h4 className={`${styles.title} ${primary_font.className}`}>
              What You Own
            </h4>
            <form className={styles.form}>
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
          <div className={styles.formContainer}>
            <h4 className={`${styles.title} ${primary_font.className}`}>
              Minus Liabilities
            </h4>
            <form className={styles.form}>
              <InputGroup
                label="Total repayable Loans/Debts you have"
                value={debts}
                onChange={handleInput(setDebts)}
                placeholder="e.g. 10000"
              />
            </form>
          </div>

          {/* Calculated Result */}
          <div className={styles.formContainer}>
            <h4 className={`${styles.title} ${primary_font.className}`}>
              Your Calculated Net Value
            </h4>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Total Value</label>
                <input value={total.toLocaleString()} readOnly />
              </div> 
              <div className={styles.inputGroup}>
                <label>Your Zakat</label>
                {!warning ? (
                  <input value={zakat.toLocaleString()} readOnly />
                ) : (
                  <p className={styles.warningText}> &quot;{warning} &quot;</p>
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
