import { useState } from "react";
import cardLogo from "./assets/card-logo.svg";
import CompletedLogo from "./assets/icon-complete.svg";

function App() {
  const [cardInfo, setCardInfo] = useState({
    cardHolder: "",
    cardNumber: "",
    cardExpDateMM: "",
    cardExpDateYY: "",
    cardCvc: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    let { value, name } = event.target;
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "");
    }
  
    setCardInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  

  function checkSubmit(event) {
    setErrors({});
    event.preventDefault();
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/gi.test(cardInfo.cardHolder)) {
      setErrors((prevValue) => ({
        ...prevValue,
        name: `This isn't a valid name, please only use letters or space.`,
      }));
    }
    if (cardInfo.cardNumber.length < 15 || cardInfo.cardNumber.length > 16) {
      setErrors((prevValue) => ({
        ...prevValue,
        number: `This isn't a valid Card Number.`,
      }));
    }
    if (cardInfo.cardCvc.length !== 3) {
      setErrors((prevValue) => ({
        ...prevValue,
        cvc: `This isn't a valid Card Verification Code.`,
      }));
    }
    
    handleSubmit();
  }

  function handleSubmit() {
    if (Object.values(errors).length === 0) {
      setSubmitted(true);
    }
  }

  function formatCardNumber(number) {
    let formattedNumber = "";
    for (let i = 0; i < number.length; i += 4) {
      const chunk = number.slice(i, i + 4);
      formattedNumber += `${chunk} `;
    }
    return formattedNumber.trim();
  }

  return (
    <div className="container">
      <div className="cards">
        <div className="card front">
          <img src={cardLogo} alt="logo" className="card-logo" />
          <h3 className="card-number">
            {cardInfo.cardNumber
              ? formatCardNumber(cardInfo.cardNumber)
              : "0000 0000 0000 0000"}
          </h3>

          <div className="card-name">
            <h3 className="card-owner">
              {cardInfo.cardHolder ? cardInfo.cardHolder : "Lucas Oliveira"}
            </h3>
            <h3 className="exp-date">
              {cardInfo.cardExpDateMM && cardInfo.cardExpDateYY
                ? `${cardInfo.cardExpDateMM}/${cardInfo.cardExpDateYY}`
                : "00/00"}
            </h3>
          </div>
        </div>
        <div className="card back">
          <h3 className="cvc ">
            {cardInfo.cardCvc ? cardInfo.cardCvc : "000"}
          </h3>
        </div>
      </div>
      <div className="form-content">
        {!submitted ? (
          <form className="form center" onSubmit={checkSubmit} action="#">
            <label>
              Cardholder name
              <input
                type="string"
                placeholder="ex. Lucas Oliveira"
                name="cardHolder"
                value={cardInfo.cardHolder}
                onChange={handleChange}
                required
              ></input>
            </label>
            {errors.name && <p className="error">{errors.name}</p>}

            <label>
              Card number
              <input
                type="string"
                placeholder="ex. 1234 5678 1234 5678"
                name="cardNumber"
                onChange={handleChange}
                required
              ></input>
            </label>
            {errors.number && <p className="error">{errors.number}</p>}

            <div className="card-date-cvc">
              <label className="exp-date">
                Exp. Date (MM/YY)
                <div>
                  <input
                    type="number"
                    placeholder="MM"
                    name="cardExpDateMM"
                    min="1"
                    max="12"
                    className="card-date mm"
                    value={cardInfo.cardExpDateMM}
                    onChange={handleChange}
                    required
                  ></input>
                  <input
                    type="number"
                    placeholder="YY"
                    name="cardExpDateYY"
                    min="22"
                    max="99"
                    className="card-date yy"
                    value={cardInfo.cardExpDateYY}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </label>

              <label className="cvc-label">
                CVC
                <input
                  type="number"
                  placeholder="e.g. 123"
                  name="cardCvc"
                  min="0"
                  max="999"
                  className="card-cvc"
                  value={cardInfo.cardCvc}
                  onChange={handleChange}
                  required
                ></input>
              </label>
            </div>
            {errors.cvc && <p className="error">{errors.cvc}</p>}
            <label>
              <input type="submit" value="Confirm" className="confirm-btn" />
            </label>
          </form>
        ) : (
          <div className="confirmed-content">
            <img
              src={CompletedLogo}
              className="completed-logo"
            />
            <h2>Obrigado.</h2>
            <p>Adicionado dados do cartão!</p>
            <button className="confirmed">Continuar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
