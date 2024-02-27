import React, { useState } from "react";
import { Collapse } from "reactstrap";

function AboutFAQ() {
  const accordions = [
    {
      q: `1. What is Advocate Iron, and how does it revolutionize legal practices?`,
      a: `Advocate Iron is an innovative legal tech platform leveraging state-of-the-art AI technologies to transform legal practices. At its core, it introduces AI-driven legal research chatbots and document automation features, streamlining and enhancing various aspects of legal work. These AI technologies empower lawyers to conduct research more efficiently by utilizing Natural Language Processing (NLP) and machine learning. The platform aims to make legal research more accurate and accessible, ultimately elevating the overall quality of legal services`,
    },
    {
        q:`2. How does Advocate Iron utilize AI to change legal research?`,
        a:`Advocate Iron's AI-driven features redefine legal research by providing quick and precise insights from extensive datasets of legal judgments. Through machine learning algorithms, the platform's chatbots understand and respond to natural language queries. This functionality significantly expedites the research process, ensuring legal professionals have access to the most relevant and up-to-date information.

        The AI-driven capabilities include extracting key insights, identifying relevant case law, and offering valuable context to legal issues. By embracing AI in legal research, Advocate Iron aims to revolutionize traditional methods, making them more efficient and tailored to the needs of legal professionals.
        `
    },
    {
        q:`3. What specific features does Advocate Iron offer for legal research through AI?`,
        a:`Advocate Iron's AI-driven features encompass a comprehensive set of tools for legal research. The chatbots are trained on vast datasets, enabling them to understand complex queries and deliver accurate information. Lawyers can interact with these chatbots to extract insights, identify precedents, and obtain relevant information swiftly.

        The platform's commitment to efficiency is reflected in its ability to save time for legal professionals. The sophisticated AI integration ensures that users receive targeted and contextually rich results, contributing to a more streamlined and effective legal research experience`
    },
    {
        q:`4. Is Advocate Iron only for legal research, or does it offer additional features?`,
        a:`While Advocate Iron excels in AI-driven legal research, it goes beyond this by introducing a pioneering legal marketplace. This marketplace connects lawyers and clients seamlessly, incorporating features like client rating IDs. Additionally, the platform provides free access to its features for lawyers, charging only a minimal subscription fee from clients.

        The holistic approach of Advocate Iron, combining cutting-edge research tools with a dynamic marketplace, aims to address various facets of legal practice and enhance collaboration between legal professionals and clients.
        `
    },
    {
        q:`5. How does Advocate Iron ensure accessibility for new and junior lawyers?`,
        a:`Advocate Iron is committed to supporting new and junior lawyers by offering free courses and providing access to clients. This initiative aims to bridge the gap between experienced professionals and those starting their legal careers. By fostering an environment of learning and collaboration, Advocate Iron seeks to empower the next generation of legal practitioners.
        `
    },
    {
        q:`6. How secure is the platform for lawyers and clients to communicate?`,
        a:`Security is a top priority for Advocate Iron. The platform provides a secure and user-friendly interface for communication between lawyers and clients. By implementing robust security measures, encryption protocols, and privacy standards, Advocate Iron ensures that all interactions on the platform are confidential and protected.
        `
    },
    {
        q:`7. What is the pricing model for Advocate Iron, and what does it include?`,
        a:`Advocate Iron adopts a unique pricing model, offering all features free of charge for lawyers. For clients, the platform charges a minimal subscription fee of 980 PKR per month per case. Additionally, lawyers are required to complete a one-time registration process, which includes submitting necessary information along with a registration fee of 885 PKR. This fee covers the issuance of a Bar Council card and helps maintain the authenticity of lawyers on the platform.
        `
    },
    {
        q:`8. How does the one-time registration process work for lawyers?`,
        a:`The one-time registration process for lawyers on Advocate Iron involves providing essential information, including a Bar Council card, identity card, and details such as email, phone, and address. This thorough registration ensures the legitimacy of lawyers on the platform, enhancing trust and authenticity. The process is designed to be straightforward while maintaining the necessary standards for legal professionals.
        `
    },
    {
        q:`9. Can clients trust the payment schedule on Advocate Iron?`,
        a:`Advocate Iron addresses concerns about payment schedules by charging clients a minimal subscription fee of 980 PKR per month per case. This transparent and predictable pricing model ensures that clients have clarity and confidence in the financial aspect of their legal engagements. By offering a straightforward payment structure, Advocate Iron aims to build trust and facilitate smooth interactions between lawyers and clients.
        `
    },
    {
        q:`10. How does Advocate Iron contribute to making justice more accessible?`,
        a:`Advocate Iron plays a crucial role in making justice more accessible by introducing a legal marketplace that connects lawyers and clients efficiently. The platform's commitment to free access for lawyers, along with a minimal subscription fee for clients, eliminates barriers and ensures that legal services are within reach for a broader audience. This inclusivity aligns with Advocate Iron's mission to contribute to a more accessible and equitable legal system.
        `
    },
  ];
  const [openAccordion, setOpenAccordion] = useState(1);

  const toggleAccordion = (accordionIndex) => {
    setOpenAccordion(openAccordion === accordionIndex ? null : accordionIndex);
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-5 mb-8 mb-lg-0">
              <img
                src={require("../../assets/images/about/04.png")}
                alt="Image1"
                className="img-fluid"
              />
            </div>
            <div className="col-12 col-lg-6">
              <div className="accordion" id="accordion">
                {accordions.map((d, i) => (
                  <div key={i} className="accordion-item rounded mb-2">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button border-0 mb-0 bg-transparent"
                        color="link"
                        onClick={() => toggleAccordion(i)}
                        aria-expanded={openAccordion === i}
                        aria-controls="collapseOne"
                      >
                        {d.q}
                      </button>
                    </h2>
                    <Collapse
                      isOpen={openAccordion === i}
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body text-muted">{d.a}</div>
                    </Collapse>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutFAQ;
