import React, { useEffect, useRef, useState } from "react";
import { randomFromArray } from "../../utils";
import styles from "./URLinput.module.scss";

const URLinput = (props) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [example, setExample] = useState("");

  useEffect(() => {
    inputRef.current.focus();
    setExample(randomFromArray(props.examples));
  }, [inputRef, props.examples]);

  const validateQuery = (input = query, { logError } = { logError: false }) => {
    try {
      new URL(input);
      setIsValid(true);
    } catch (error) {
      logError && console.error(error);
      setIsValid(false);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    validateQuery();
  };

  const handlePaste = (e) => {
    e.preventDefault(); // prevents paste event from polluting query value
    const input = e.clipboardData.getData("Text").trim();
    setQuery(input);
    validateQuery(input); // this is a work around. it should be checking `query`, but `query` does not update by the time this is run? 🤷‍♂️
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // even though our submit button is disabled on !isValid, let's do some validation just to be sure:
    validateQuery(query, { logError: true });
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
          onBlur={() => validateQuery(query)}
          className={styles.input}
          aria-describedby="url-input-status"
          aria-invalid={!isValid}
          required
        />
        {!isValid && (
          <span id="url-input-status" className={styles.status}>
            Please enter a valid URL.{" "}
            <span className={styles.hint}>For example: {example}</span>
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
