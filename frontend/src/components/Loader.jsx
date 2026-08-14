export default function Loader({ full = false }) {
  return (
    <div className={full ? "loader-wrap vh-100" : "loader-wrap"}>
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
}
