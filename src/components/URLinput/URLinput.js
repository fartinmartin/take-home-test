import React, { useEffect, useRef, useState } from "react";

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
    setQuery(e.clipboardData.getData("Text")); // TODO: this doesn't seem to update it 🤷‍♂️
    validateQuery({ logError: false });
  };

  // TODO: debounce the onChange event
  // const handleQueryDebounced = debounce(handleQueryChange, 250);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateQuery({ logError: true });
    isValid && props.callback(query);
  };

  return (
    <form onSubmit={handleSubmit} className="url-input">
      <span className="url-input__status">
        This {isValid ? `is` : `is not`} a URL.
      </span>
      <input
        type="text"
        ref={queryInput}
        value={query}
        onChange={handleQueryChange}
        onPaste={handlePaste}
        className="url-input__input"
      />
      <input type="submit" value="Fetch" className="url-input__button" />
    </form>
  );
};

export default URLinput;
