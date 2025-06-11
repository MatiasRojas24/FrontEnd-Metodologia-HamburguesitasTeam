import { useShallow } from "zustand/shallow";
import { ordenCompraStore } from "../store/ordenCompraStore";
import type { IOrdenCompra } from "../types/IOrdenCompra";
import type { IUsuario } from "../types/IUsuario";
import type { IDireccion } from "../types/IDireccion";
import {
    getOrdenesComprasHabilitadasHttp,
    getOrdenesCompraHttp,
    getOrdenCompraByIdHttp,
    createOrdenCompraHttp,
    updateOrdenCompraHttp,
    deleteOrdenCompraHttp,
    toggleHabilitadoHttp,
    addUsuarioToOrdenCompraHttp,
    addDireccionEnvioToOrdenCompraHttp,
    getOrdenesCompraByUsuarioIdHttp,
    getOrdenesCompraByDireccionEnvioIdHttp,
} from "../http/ordenCompraHttp";
import { CustomSwal } from "../components/UI/CustomSwal/CustomSwal";

export const useOrdenCompra = () =>     {
    const {
        setOrdenesCompra,
        setOrdenesComprasHabilitadas,
        añadirOrdenCompra,
        eliminarOrdenCompra,
        actualizarOrdenCompra,
    } = ordenCompraStore(
        useShallow((state) => ({
            setOrdenesCompra: state.setOrdenesCompra,
            setOrdenesComprasHabilitadas: state.setOrdenesComprasHabilitadas,
            añadirOrdenCompra: state.añadirOrdenCompra,
            eliminarOrdenCompra: state.eliminarOrdenCompra,
            actualizarOrdenCompra: state.actualizarOrdenCompra,
    }))
);

const getOrdenesCompras = async (): Promise<void> => {
    try {
        const data = await getOrdenesCompraHttp();
        if (data) setOrdenesCompra(data);
    } catch (error) {
        console.error("Error en getOrdenesCompras: ", error);
    }
};

    const getOrdenesComprasHabilitadas = async (): Promise<void> => {
        try {
        const data = await getOrdenesComprasHabilitadasHttp();
        if (data) setOrdenesComprasHabilitadas(data);
    } catch (error) {
        console.error("Error en getOrdenesComprasHabilitadas: ", error);
    }
    };

    const getOrdenCompraById = async (
        ordenId: string
    ): Promise<IOrdenCompra | undefined> => {
        try {
        const data = await getOrdenCompraByIdHttp(ordenId);
        if (!data) throw new Error();
        return data;
    } catch (error) {
        console.error("Error en getOrdenCompraById: ", error);
    }
    };

  const createOrdenCompra = async (
    orden: IOrdenCompra
  ): Promise<boolean> => {
    try {
      const data = await createOrdenCompraHttp(orden);
      if (data) {
        añadirOrdenCompra(data);
        CustomSwal.fire("Éxito", "Orden de compra creada correctamente", "success");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en createOrdenCompra: ", error);
      CustomSwal.fire("Error", "No se pudo crear la orden de compra", "error");
      return false;
    }
  };

  const updateOrdenCompra = async (
    orden: IOrdenCompra
  ): Promise<void> => {
    try {
      const data = await updateOrdenCompraHttp(orden);
      if (data) {
        actualizarOrdenCompra(orden);
        CustomSwal.fire("Éxito", "Orden de compra actualizada correctamente", "success");
      }
    } catch (error) {
      console.error("Error en updateOrdenCompra: ", error);
      CustomSwal.fire("Error", "No se pudo actualizar la orden de compra", "error");
    }
  };

  const enableDisableOrdenCompra = async (
    ordenId: string
  ): Promise<void> => {
    try {
      await toggleHabilitadoHttp(ordenId);
      await getOrdenesCompras();
    } catch (error) {
      console.error("Error en enableDisableOrdenCompra", error);
    }
  };

  const deleteOrdenCompra = async (
    ordenId: string
  ): Promise<void> => {
    try {
      const confirm = await CustomSwal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción podría causar problemas. Recomendamos solo deshabilitar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });
      if (!confirm.isConfirmed) return;
      const data = await deleteOrdenCompraHttp(ordenId);
      if (data) {
        eliminarOrdenCompra(ordenId);
        CustomSwal.fire("Éxito", "Orden de compra eliminada correctamente", "success");
      }
    } catch (error) {
      console.error("Error en deleteOrdenCompra", error);
      CustomSwal.fire("Error", "No se pudo eliminar la orden de compra", "error");
    }
  };

  const addUsuarioToOrdenCompra = async (
    usuario: IUsuario,
    ordenId: string
  ): Promise<void> => {
    try {
      const data = await addUsuarioToOrdenCompraHttp(usuario, ordenId);
      if (data) {
        actualizarOrdenCompra(data);
        CustomSwal.fire(
          "Éxito",
          "Usuario agregado a la orden de compra correctamente",
          "success"
        );
      }
    } catch (error) {
      console.error("Error en addUsuarioToOrdenCompra", error);
      CustomSwal.fire(
        "Error",
        "No se pudo agregar el usuario a la orden de compra",
        "error"
      );
    }
  };

  const addDireccionEnvioToOrdenCompra = async (
    direccion: IDireccion,
    ordenId: string
  ): Promise<void> => {
    try {
      const data = await addDireccionEnvioToOrdenCompraHttp(direccion, ordenId);
      if (data) {
        actualizarOrdenCompra(data);
        CustomSwal.fire(
          "Éxito",
          "Dirección de envío agregada a la orden de compra correctamente",
          "success"
        );
      }
    } catch (error) {
      console.error("Error en addDireccionEnvioToOrdenCompra", error);
      CustomSwal.fire(
        "Error",
        "No se pudo agregar la dirección de envío a la orden de compra",
        "error"
      );
    }
  };

  const getOrdenesByUsuarioId = async (
    usuarioId: string
  ): Promise<void> => {
    try {
      const data = await getOrdenesCompraByUsuarioIdHttp(usuarioId);
      if (data) setOrdenesCompra(data);
    } catch (error) {
      console.error("Error en getOrdenesCompraByUsuarioId", error);
    }
  };

  const getOrdenesByDireccionEnvioId = async (
    direccionId: string
  ): Promise<void> => {
    try {
      const data = await getOrdenesCompraByDireccionEnvioIdHttp(direccionId);
      if (data) setOrdenesCompra(data);
    } catch (error) {
      console.error("Error en getOrdenesCompraByDireccionEnvioId", error);
    }
  };

  return {
    getOrdenesCompras,
    getOrdenesComprasHabilitadas,
    getOrdenCompraById,
    createOrdenCompra,
    updateOrdenCompra,
    enableDisableOrdenCompra,
    deleteOrdenCompra,
    addUsuarioToOrdenCompra,
    addDireccionEnvioToOrdenCompra,
    getOrdenesByUsuarioId,
    getOrdenesByDireccionEnvioId,
  };
};
