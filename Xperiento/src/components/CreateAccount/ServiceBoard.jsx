import { useState } from "react";
import "./XperientoInsights.scss";

const sections = [
  {
    sectionHeading: "Sales",
    items: [
      { icon: "💡", text: "New Opportunities" },
      { icon: "📈", text: "What is Trending?" },
      { icon: "⚙️", text: "In Demand" },
      { icon: "🎟️", text: "Higher Ticket Sale" },
      { icon: "🔄", text: "Customer Retention" },
      { icon: "♻️", text: "Repeat Purchase" },
      { icon: "📅", text: "Upcoming Festival/Event" },
      { icon: "🌍", text: "Socio-Cultural Events" },
    ],
  },
  {
    sectionHeading: "User Insights",
    items: [
      { icon: "⭐", text: "What do they like?" },
      { icon: "✂️", text: "What do they dislike?" },
      { icon: "❓", text: "Top Concerns" },
      { icon: "😊", text: "Make them happy!" },
      { icon: "🧠", text: "Behaviours" },
      { icon: "🎯", text: "Biases" },
      { icon: "❤️", text: "Emotions" },
    ],
  },
  {
    sectionHeading: "Marketing",
    items: [
      { icon: "✉️", text: "Promotional Ideas" },
      { icon: "📤", text: "Message Opportunity" },
      { icon: "📊", text: "Better Marketing Outcomes" },
      { icon: "📈", text: "Competitive Landscape" },
    ],
  },
];

// eslint-disable-next-line react/prop-types
const ServiceBoard = ({ updateIsNewStatus }) => {
  const [step, setStep] = useState(0);

  return (
    <>
      <div className="black-bg"></div>
      {step == 0 ? (
        <div className="next-page-container">
          <img
            className="image"
            src="/assets/Card/XXSvg.svg"
            height={400}
            width={400}
            alt="logo"
          />
          <h1>
            Make Your Food & Beverage Business better with
            <br />
            <strong>
              <span className="star">X</span>periento
            </strong>
            <br />
            insights updated almost daily!
          </h1>

          <button onClick={() => setStep(1)} className="start button">
            Next
          </button>
        </div>
      ) : (
        <div className="serviceBoard">
          <h1 className="head">
            <span className="highlight">X</span>periento Insights
          </h1>
          <div className="section-container">
            {sections.map((section, index) => (
              <div key={index} className="row">
                <div>
                  <div className="card-header">{section.sectionHeading}</div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      {section.items.map((item, index) => (
                        <li key={index}>
                          <span className="icon">{item.icon}</span> {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="centered">
            <button
              className="start"
              onClick={() => {
                sessionStorage.removeItem("isNew");
                updateIsNewStatus(false);
              }}
            >
              Show Me Insights
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceBoard;
