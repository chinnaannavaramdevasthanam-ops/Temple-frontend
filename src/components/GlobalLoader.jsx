import { useLoader } from "../context/LoaderContext";

export default function GlobalLoader() {
  const { loadingCount } = useLoader();

  if (loadingCount === 0) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <div className="spinner-border text-warning" />
    </div>
  );
}
