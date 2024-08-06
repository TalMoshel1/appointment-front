import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import DetailsLesson from "./detailsLesson";
import DeleteLesson from "./deleteLesson";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 3rem;
  top: 0;
  padding: 0.5rem;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  border: none;
  margin: 0;
  direction: rtl;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  // background-color: rgba(255, 255, 255, 0.5);
  border-radius:20px;
  margin-bottom: 3rem;
  @media (orientation: landscape) {
    top: 1rem;

  }
    @media (orientation: portrait) {
    top: 1rem;

  }
  margin-block-start: 0em;
  margin-block-end: 0em;
  padding-inline-start: 0px;
`;

const ListItem = styled.li`
  background-color: #38b2ac;
  color: black;
  position: relative;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 80%;
  max-width: 400px;
  display: flex;
  justify-content: space-evenly;
`;

export const IndividualDay = ({ displayedData }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonIdToHide, setLessonIdToHide] = useState([])

  const displayLessons = () => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const sortByEndTime = (arr) => {
      return arr.sort((a, b) => parseTime(a.endTime) - parseTime(b.endTime));
    };
  
    // Filter out lessons that are in the lessonIdToHide array
    const filteredLessons = displayedData.filter((lesson) => {
      return !lessonIdToHide.includes(lesson._id);
    });
  
    // If lessonIdToHide is not empty and no lessons left after filtering
    if (lessonIdToHide.length > 0 && filteredLessons.length === 0) {
      return [];
    }
  
    // Filter lessons that are approved
    const approvedLessons = filteredLessons.filter((lesson) => lesson.isApproved);
  
    // Return sorted approved lessons
    return sortByEndTime(approvedLessons);
  };


  const hideLesson = (lessonId) => {
    setLessonIdToHide((prev)=>([...prev, lessonId]))
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lesson) => {
    setCurrentLesson(lesson);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleOpenDetailsModal = (lesson) => {
    setCurrentLesson(lesson);
    setModalType("details");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentLesson(null);
    setModalType("");
  };

  const renderModalContent = () => {
    if (modalType === "details") {
      return <DetailsLesson lesson={currentLesson} closeModal={handleCloseModal} />;
    } else if (modalType === "delete") {
      return <DeleteLesson lesson={currentLesson} closeModal={handleCloseModal} hideLesson={hideLesson} />;
    }
    return null;
  };

  if (displayedData.length > 0) {
    const time = displayedData[0].day;
    const date = new Date(time);


    return (
      <>
        <ListContainer>
          <h1>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </h1>
          {displayLessons().map((l, index) => {
            if (user?.user?.role === 'admin' && l.isApproved && l.type !== 'group') {
              return (
                <ListItem key={index}>
                  {user?.user?.role === "admin" && (
                    <CloseButton onClick={() => handleOpenDeleteModal(l)}>
                      <CloseIcon />
                    </CloseButton>
                  )}

                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ direction: "ltr" }}>
                        {l.startTime} - {l.endTime}
                      </span>
                      <strong>
                        <span>אימון אישי</span>
                        <br />
                        <span>מאמן: {l.trainer}</span>
                        <br />
                        {l.type === 'private' && (
                          <span>{l.studentName} {l.studentPhone}</span>
                        )}
                      </strong>
                    </div>
                  </div>
                </ListItem>
              );
            } else if (l.type === 'group') {
              return (
                <ListItem key={index}>
                  {user?.user?.role === "admin" && (
                    <CloseButton onClick={() => handleOpenDeleteModal(l)}>
                      <CloseIcon />
                    </CloseButton>
                  )}

                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ direction: "ltr" }}>
                        {l.startTime} - {l.endTime}
                      </span>
                      <strong>
                        <span>
                          {l.type === "private" ? "אימון אישי" : "אימון: " + l.name}
                        </span>
                        <br />
                        <span>מאמן: {l.trainer}</span>
                        <br />
                        <span>{l.description}</span>
                      </strong>
                    </div>
                  </div>
                </ListItem>
              );
            }
          })}
        </ListContainer>

        {isModalOpen && (
          <Modal type={modalType} closeModal={handleCloseModal}>
            {renderModalContent()}
          </Modal>
        )}
      </>
    );
  }

  return <h1>לחץ על תאריך צבוע</h1>;
};

export default IndividualDay;
