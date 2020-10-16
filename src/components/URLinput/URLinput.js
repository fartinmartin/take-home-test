import React, { useEffect, useRef, useState } from "react";
import styles from "./URLinput.module.scss";

const URLinput = (props) => {
  const queryInput = useRef(null);
  const [query, setQuery] = useState(""); // https://swapi.dev/api/planets/1/ // https://www.breakingbadapi.com/api/characters
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    queryInput.current.focus();
  }, [queryInput]);

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
    validateQuery({ logError: false }); // TODO: this doesn't seem to update in sync 🤷‍♂️
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateQuery({ logError: true });
    isValid && props.callback(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label for="url">Public JSON API endpoint</label>
        <input
          id="url"
          type="text"
          ref={queryInput}
          value={query}
          onChange={handleQueryChange}
          onPaste={handlePaste}
          onBlur={validateQuery}
          className={styles.input}
          aria-describedby="url-input-status"
          aria-invalid={!isValid}
          required
        />
        <span id="url-input-status" className={styles.status}>
          <span className="code">{query}</span> is not a valid URL.
        </span>
      </div>
      <input type="submit" value="Fetch" className={styles.button} />
    </form>
  );
};

export default URLinput;
