import { Button, useNotification } from "../../components";

export function Home() {
  const { notification } = useNotification();
  const onSaveOldQuotations = () =>
    notification({
      type: "success",
      title: "El guardado fue un exito!!!",
    });

  return (
    <div>
      <Button type="primary" onClick={onSaveOldQuotations}>
        Guardar Quotation
      </Button>
      <h1>Inicio</h1>
    </div>
  );
}
