import React, { useEffect, useRef, useState } from "react";
import { randomFromArray } from "../../utils";
import styles from "./URLinput.module.scss";

const URLinput = (props) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    inputRef.current.focus();
    setPlaceholder(randomFromArray(props.placeholders));
  }, [inputRef, props.placeholders]);

  const validateQuery = ({ logError }) => {
    try {
      new URL(query);
      setIsValid(true);
    } catch (error) {
      logError && console.error(error);
      setIsValid(false);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    validateQuery({ logError: false });
  };

  const handlePaste = (e) => {
    e.preventDefault(); // prevents paste event from polluting query value
    setQuery(e.clipboardData.getData("Text"));
    validateQuery({ logError: false }); // TODO: this doesn't seem to work on the FIRST paste event 🤷‍♂️
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateQuery({ logError: true });
    isValid && props.callback(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="url">
        Public JSON API endpoint:
      </label>
      <div className={styles.inputWrap}>
        <input
          id="url"
          type="text"
          ref={inputRef}
          value={query}
          onChange={handleQueryChange}
          onPaste={handlePaste}
          onBlur={validateQuery}
          className={styles.input}
          aria-describedby="url-input-status"
          aria-invalid={!isValid}
          required
        />
        {!isValid && (
          <span id="url-input-status" className={styles.status}>
            Please enter a valid URL.{" "}
            <span className={styles.hint}>For example: {placeholder}</span>
          </span>
        )}
      </div>
      <input
        type="submit"
        value="Fetch"
        className={`${styles.button} ${isValid && styles.valid}`}
        disabled={!isValid}
      />
    </form>
  );
};

export default URLinput;
