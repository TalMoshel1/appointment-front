import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  toggleSetDeleteLessonModal,
  setLessonsToDisplay,
} from "../redux/calendarSlice.js";

const DeleteLesson = ({
  lesson: propLesson,
  closeModal,
  hideLesson,
  removeLesson,
}) => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.calendar.deleteLessonModalData);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const token = JSON.parse(boxing)?.token;
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  const handleToggleModal = (obj) => {
    dispatch(toggleSetDeleteLessonModal());
    if (obj) {
      dispatch(setLessonsToDisplay(obj));
    }
  };

  const handleDeleteAllChange = (event) => {
    setIsDeleteAll(event.target.checked);
  };

  const deleteLesson = async (lessonId) => {
    try {
      const response = await fetch(
        // `https://http://appointment-back-qd2z.onrender.com/api/lessons/${lessonId}`,
                `http://localhost:3002/api/lessons/${lessonId}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ deleteAll: isDeleteAll }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (hideLesson) {
        hideLesson(lessonId);
        return closeModal();
      }
      if (removeLesson) {
        removeLesson(lessonId);
        return closeModal();
      }
      handleToggleModal({ type: "deleteDisplayedLesson", id: lessonId });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const DeleteContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    align-items: center;

    button {
      padding: 1rem;
      font-size: 1rem;
      border: none;
    }
  `;

  const currentLesson = propLesson || (lesson && lesson.lesson) || {};

  const repeatsWeekly = currentLesson.repeatsWeekly || false;

  return (
    <DeleteContainer>
      {repeatsWeekly && (
        <>
          <label
            style={{
              color: "#fff",
              direction: "rtl",
              textAlign: "center",
              fontWeight: "100",
            }}
          >
            מחק את כל השיעורים בסדרה זו
          </label>
          <input
            type="checkbox"
            checked={isDeleteAll}
            onChange={handleDeleteAllChange}
          />
        </>
      )}

      <button
        type="button"
        style={{
          backgroundColor: "#F0F0F0",
          color: "black !important",
          padding: "1rem",
          borderRadius: "20px",
          width: "max-content",
        }}
        onClick={() => {
          if (currentLesson._id) {
            deleteLesson(currentLesson._id);
            if (closeModal) {
              closeModal();
            }
          } else {
            console.error("No lesson ID provided.");
          }
        }}
      >
        מחק
      </button>
    </DeleteContainer>
  );
};

export default DeleteLesson;
