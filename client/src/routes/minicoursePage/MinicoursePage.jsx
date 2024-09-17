import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MinicourseDetails from "../../components/minicourses/MinicourseDetails";

const MinicoursePage = () => {
  const { id } = useParams();
  const [minicourse, setMinicourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinicourseDetails = async () => {
      try {
        const response = await fetch(`https://5daa-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app/minicourses/${id}`);
        if (!response.ok) {
          throw new Error("Falha ao buscar os detalhes do minicurso");
        }
        const data = await response.json();
        setMinicourse(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMinicourseDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!minicourse) {
    return <p>Minicurso não encontrado.</p>;
  }

  return (
    <MinicourseDetails
      title={minicourse.title}
      description={minicourse.description}
      instructor={minicourse.instructor}
      date={minicourse.date}
      minicourseLocation={minicourse.location}
      enrolled={minicourse.enrolled}
      capacity={minicourse.capacity}
      minicourseId={id} // Passando o ID como prop

    />
  );
};

export default MinicoursePage;
