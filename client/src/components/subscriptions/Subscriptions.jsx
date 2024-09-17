import axios from "axios";
import React, { useEffect, useState } from "react";
import SubMenuPage from "../subMenuPage/SubMenuPage";
import ToastNotification from "../toastrNotification/ToastrNotification";
import "./SubscriptionStyle.scss";

const Inscricoes = () => {
  const [activeTab, setActiveTab] = useState("palestras");
  const [inscricoesPalestras, setInscricoesPalestras] = useState([]);
  const [inscricoesMinicursos, setInscricoesMinicursos] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchInscricoes = async () => {
      try {
        const response = await axios.get("https://cd4a-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app//users/subscriptions", {
          withCredentials: true, // Enviar cookies de autenticação
        });

        setInscricoesPalestras(response.data.userLectureEnrollment || []);
        setInscricoesMinicursos(response.data.userMinicourseEnrollment || []);
      } catch (error) {
        console.error("Erro ao buscar inscrições:", error);
      }
    };

    fetchInscricoes();
  }, []);

  const handleRemoveMinicurso = async (enrollmentId) => {
    try {
      await axios.delete(`https://cd4a-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app//subscriptions/minicourses/${enrollmentId}`, {
        withCredentials: true, // Enviar cookies de autenticação
      });
      setToast({ show: true, message: "Inscrição excluída!", type: "success" });

      setInscricoesMinicursos((prevInscricoes) =>
        prevInscricoes.filter((inscricao) => inscricao.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Erro ao remover inscrição:", error);
    }
  };

  const handleRemovePalestra = async (enrollmentId) => {
    try {
      await axios.delete(`https://cd4a-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app//subscriptions/lectures/${enrollmentId}`, {
        withCredentials: true, // Enviar cookies de autenticação
      });
      setToast({ show: true, message: "Inscrição excluída!", type: "success" });

      setInscricoesPalestras((prevInscricoes) =>
        prevInscricoes.filter((inscricao) => inscricao.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Erro ao remover inscrição:", error);
    }
  };

  // Função para abrir a caixa de confirmação
  const openConfirmation = (enrollmentId, type) => {
    setItemToRemove({ enrollmentId, type });
    setShowConfirmation(true);
  };

  // Função para confirmar a exclusão
  const confirmRemoval = async () => {
    if (itemToRemove) {
      const { enrollmentId, type } = itemToRemove;
      if (type === "minicourse") {
        await handleRemoveMinicurso(enrollmentId);
      } else if (type === "lecture") {
        await handleRemovePalestra(enrollmentId);
      }
      setShowConfirmation(false);
      setItemToRemove(null);
    }
  };

  // Função para cancelar a exclusão
  const cancelRemoval = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const renderInscricoes = (inscricoes, tipo) => {
    if (!inscricoes || inscricoes.length === 0) {
      return (
        <p>
          Você ainda não tem inscrições em {tipo === "lecture" ? "palestras" : "minicursos"}.
        </p>
      );
    }

    return inscricoes.map((inscricao) => (
      <div key={inscricao.enrollmentId} className="inscricao-card">
        <span>{inscricao[tipo]?.title || "Título não disponível"}</span>
        <button onClick={() => openConfirmation(inscricao.enrollmentId, tipo)}>
          <img src="/lixeira.png" alt="Remover" />
        </button>
      </div>
    ));
  };

  return (
    <div className="inscricoes-page">
      <div className="container">
        <div className="content">
          <h1>Inscrições</h1>
          <div className="tabs">
            <button
              className={activeTab === "palestras" ? "active" : ""}
              onClick={() => setActiveTab("palestras")}
            >
              Palestras
            </button>
            <button
              className={activeTab === "minicursos" ? "active" : ""}
              onClick={() => setActiveTab("minicursos")}
            >
              Minicursos
            </button>
          </div>
          <div className="inscricoes-list">
            {activeTab === "palestras"
              ? renderInscricoes(inscricoesPalestras, "lecture")
              : renderInscricoes(inscricoesMinicursos, "minicourse")}
          </div>
        </div>
        <div className="travessaoImg">
          <img src="/travessao.png" alt="" />
        </div>
        <SubMenuPage />
      </div>

      {/* Caixa de confirmação */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Tem certeza de que deseja remover sua inscrição?</p>
            <button onClick={confirmRemoval}>Confirmar</button>
            <button onClick={cancelRemoval}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Notificação de Toast */}
      {toast.show && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Inscricoes;
