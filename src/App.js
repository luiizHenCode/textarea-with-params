import { useState } from "react";
import ContentEditable from "react-contenteditable";

function App() {
  const [text, setText] = useState("");
  const [paramSelected, setParamSelected] = useState(null);

  const handleChange = (e) => {
    const replace = e.target.value.replace("div", "span");
    const replace2 = replace.replace("<span><br></span>", "<p></p><br>");

    setText(replace2);
  };

  const listParams = [
    {
      param: "FIRST_NAME",
      value: "John",
    },
    {
      param: "LAST_NAME",
      value: "Doe",
    },
    {
      param: "EMAIL",
      value: "jonh_doe159@gmail.com",
    },
    {
      param: "PHONE",
      value: "123456789",
    },
    {
      param: "ADDRESS",
      value: "123 Main St",
    },
    {
      param: "CITY",
      value: "New York",
    },
    {
      param: "STATE",
      value: "NY",
    },
    {
      param: "ZIP",
      value: "10001",
    },
    {
      param: "COUNTRY",
      value: "USA",
    },
    {
      param: "ORDER_ID",
      value: "#0025",
    },
    {
      param: "ORDER_DATE",
      value: "2020-01-01",
    },
    {
      param: "ORDER_TOTAL",
      value: "100.00",
    },
    {
      param: "ORDER_STATUS",
      value: "Pending",
    },
    {
      param: "ORDER_DESCRIPTION",
      value: "Order Description",
    },
    {
      param: "ORDER_DELIVERY",
      value: "2020-01-01",
    },
    {
      param: "SITE_ADDRESS",
      value:
        "<a href='https://google.com' target='_blank'>www.wopen.com.br</a>",
    },
  ];

  const handleAddParamInText = () => {
    const formatParam = `<b contenteditable="false">:${listParams[paramSelected].param}:</b>&nbsp;`;

    setText(text + formatParam);
    setParamSelected(null);
  };

  const replaceParamInText = (text) => {
    let textFormatted = text;

    listParams.forEach((item) => {
      const formatParam = `:${item.param}:`;

      if (text.indexOf(formatParam) !== -1) {
        const updatedText = textFormatted.replace(formatParam, item.value);
        textFormatted = updatedText;
      }
    });
    return textFormatted;
  };

  return (
    <div className="App">
      <h1>Texto com parametros</h1>

      <div className="textarea-container">
        <ContentEditable
          className="textarea"
          html={text}
          onChange={handleChange}
          tagName="p"
          inputMode="numeric"
        />

        <div className="params-list">
          <span>Parametros</span>
          <ul>
            {listParams.map((item, index) => {
              return (
                <li
                  key={index}
                  className={paramSelected === index ? "active" : ""}
                  onClick={() => setParamSelected(index)}
                >
                  {item.param}
                </li>
              );
            })}
          </ul>
          <button
            onClick={handleAddParamInText}
            disabled={paramSelected === null}
          >
            adicionar
          </button>
        </div>
      </div>

      <h4>Resultado</h4>

      <div
        className="resultText"
        dangerouslySetInnerHTML={{ __html: replaceParamInText(text) }}
      />
    </div>
  );
}

export default App;
