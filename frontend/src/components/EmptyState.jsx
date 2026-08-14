import { FiInbox } from "react-icons/fi";
export default function EmptyState({
  title = "Nothing here yet",
  text = "Start by adding your first item.",
  action = null,
}) {
  return (
    <div className="empty-state">
      <FiInbox />
      <h5>{title}</h5>
      <p>{text}</p>
      {action}
    </div>
  );
}
