import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LectureDetails from '../../components/leactures/LectureDetails'; // O componente que criamos

const LecturePage = () => {
  const { id } = useParams(); // Esse "id" é o lectureId
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        const response = await fetch(`https://cd4a-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app//lectures/${id}`);
        const data = await response.json();
        setLecture(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes da palestra:', error);
        setLoading(false);
      }
    };

    fetchLectureDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!lecture) {
    return <p>Palestra não encontrada.</p>;
  }

  return (
    <LectureDetails
      title={lecture.title}
      description={lecture.description}
      speaker={lecture.speaker}
      date={lecture.date}
      lectureLocation={lecture.location} // Passando a localização corretamente
      enrolled={lecture.enrolled}
      capacity={lecture.capacity}
      lectureId={id} // Passando o ID da palestra como prop
    />
  );
};

export default LecturePage;
