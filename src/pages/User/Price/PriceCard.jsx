import { Tooltip } from "react-tooltip";

function PriceCard({ className, planType }) {
  const startList = [
    {
      text: "20 mins of video or audio processing per month",
      tooltip: "20 mins of video or audio processing per month",
    },

    {
      text: "Invite your team -  up to 3 users",
      tooltip:
        "Invite other people to collaborate with you on your VideoAsk organization",
    },
    { text: "All core features", tooltip: "Access all the core features" },
    {
      text: "Conditional Logic",
      tooltip: "Use conditional logic in your workflows",
    },
    {
      text: "Collect payments with Stripe",
      tooltip: "Collect payments with Stripe",
    },
    {
      text: "Zapier integration",
      tooltip: "Integrate with Zapier for automation",
    },
    { text: "Appointment scheduling", tooltip: "Schedule appointments easily" },
    {
      text: "Voice-text transcription & captions",
      tooltip: "Convert voice to text with captions",
    },
  ];

  const growList = [
    {
      text: "Partially Videoask branded",
      tooltip: "Your videos will include partial branding from VideoAsk",
    },
    {
      text: "Unlimited steps per videoask",
      tooltip: "Create videoasks with unlimited steps",
    },
    {
      text: "Invite your team - up to 5 users",
      tooltip:
        "Invite other people to collaborate with you on your VideoAsk organization, up to 5 users",
    },
    {
      text: "Data export",
      tooltip: "Export your data for further analysis or backup",
    },
    {
      text: "Redirect to URL",
      tooltip:
        "Redirect respondents to a specific URL after completing a videoask",
    },
    {
      text: "Live Calls",
      tooltip: "Engage in live calls with your respondents",
    },
    {
      text: "Net Promoter Score",
      tooltip:
        "Measure the likelihood of respondents recommending your service",
    },
    {
      text: "File Upload",
      tooltip: "Allow respondents to upload files as part of their response",
    },
    {
      text: "Respondent tracking",
      tooltip: "Track the engagement and responses of your respondents",
    },
    {
      text: "Custom variables (hidden fields)",
      tooltip:
        "Use custom variables to capture additional data without displaying it to respondents",
    },
    {
      text: "Video length control",
      tooltip:
        "Control the maximum length of videos that respondents can submit",
    },
  ];

  const brandList = [
    {
      text: "Add your own brand/s",
      tooltip: "Customize your VideoAsk with your own branding and logos",
    },
    {
      text: "Unlimited steps per videoask",
      tooltip:
        "Create videoasks with unlimited steps to engage your audience fully",
    },
    {
      text: "Invite your team - up to 10 users",
      tooltip:
        "Collaborate with up to 10 team members on your VideoAsk organization",
    },
    {
      text: "Domain white labeling",
      tooltip: "Use your own domain name for a seamless brand experience",
    },
    {
      text: "Priority support",
      tooltip:
        "Get priority access to our support team for any issues or questions",
    },
    {
      text: "AI Chatbot",
      tooltip: "Leverage AI Chatbot for automated responses and engagement",
    },
  ];

  return (
    <div id="PriceCard-container" className={className}>
      <div className="card">
        <div className="title" style={{ color: "orange" }}>
          Start
        </div>
        <div className="sub-title">
          All the essentials you need to get the conversation started.
        </div>
        <div className="price-text">
          <span>$0</span>
          <span>USD</span>
        </div>
        <button className="card-btn btn-start">Get Started</button>
        <div className="feature-list">
          <li>
            <strong style={{ color: "orange" }}>20 mins</strong> of video or
            audio processing per month
          </li>
          <div className="mt-20 text-18-400 mb-10">
            <strong>This plan includes the following features:</strong>
          </div>
          {startList.map((feature, index) => (
            <>
              <li
                key={index}
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={feature.tooltip}
              >
                {feature.text}
              </li>

              <Tooltip className="tooltip" id={`tooltip-${index}`} />
            </>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="title" style={{ color: "purple" }}>
          Grow
        </div>
        <div className="sub-title">
          Make conversations adapt to everyone. Build custom workflows.
        </div>
        <div className="price-text">
          <span>${planType === "Yearly" ? "24" : "30"}</span>
          <span>USD</span>
          <span style={{ display: "block" }}>per month billed yearly</span>
        </div>
        <button className="card-btn btn-grow">Get Started</button>
        <div className="feature-list">
          <li>
            <strong style={{ color: "purple" }}>
              {planType === "Yearly" ? "1200" : "100"} mins
            </strong>{" "}
            of video or audio processing per year
          </li>
          <div className="mt-20 text-18-400 mb-10">
            <strong>
              This plan includes all features from Start, plus the following::
            </strong>
          </div>
          {growList.map((feature, index) => (
            <>
              <li
                key={index}
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={feature.tooltip}
              >
                {feature.text}
              </li>

              <Tooltip className="tooltip" id={`tooltip-${index}`} />
            </>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="title" style={{ color: "#299f63" }}>
          Brand
        </div>
        <div className="sub-title">
          Put your brand front and center. Own the entire experience.
        </div>
        <div className="price-text">
          <span>${planType === "Yearly" ? "40" : "50"}</span>
          <span>USD</span>
          <span style={{ display: "block" }}>per month billed yearly</span>
        </div>
        <button className="card-btn btn-brand">Get Started</button>
        <div className="feature-list">
          <li>
            <strong style={{ color: "#299f63" }}>
              {planType === "Yearly" ? "2400" : "200"} mins
            </strong>{" "}
            of video or audio processing per year
          </li>
          <div className="mt-20 text-18-400 mb-10">
            <strong>
              This plan includes all features from Grow, plus the following:
            </strong>
          </div>
          {brandList.map((feature, index) => (
            <>
              <li
                key={index}
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={feature.tooltip}
              >
                {feature.text}
              </li>

              <Tooltip className="tooltip" id={`tooltip-${index}`} />
            </>
          ))}
        </div>

        <div>
          <button className="add-more">+ ADD more minutes</button>
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
