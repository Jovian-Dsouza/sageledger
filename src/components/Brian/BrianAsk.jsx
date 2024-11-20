import SystemMesage from "@/components/SystemMessage";

import ReactMarkdown from 'react-markdown'
export function MarkdownToHtml({children}){
  return(
    <ReactMarkdown>{children}</ReactMarkdown>
  )
}

function BrianAsk({ message_details }) {
  return (
    <SystemMesage title="Ask Brian" poweredBy="Brianknows.org">
      <MarkdownToHtml className="text-sm">{message_details}</MarkdownToHtml>
    </SystemMesage>
  );
}

export default BrianAsk;
