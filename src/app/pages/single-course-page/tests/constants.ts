export const fetchingDataMock = {
  courseData: {},
  videoRef: null,
};

export const loadedDataMock = {
  courseData: {
    title: "Test Title",
    description: "Test description",
  },
  videoRef: null,
};

export const lessonsCardsDataMock = {
  courseData: {
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        status: "unlocked",
        link: "lesson-1",
        order: 1,
        previewImageLink: "preview-1",
      },
      {
        id: 2,
        title: "Lesson 2",
        status: "unlocked",
        link: "lesson-2",
        order: 2,
        previewImageLink: "preview-2",
      },
      {
        id: 3,
        title: "Lesson 3",
        status: "locked",
        link: "lesson-3",
        order: 3,
        previewImageLink: "preview-3",
      },
    ],
  },
  videoRef: null,
};
