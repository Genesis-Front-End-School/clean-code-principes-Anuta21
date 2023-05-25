export const fetchingDataMock = {
  courses: [],
  currentPage: 1,
  setCurrentPage: () => {},
  coursesArrayBounds: {
    start: 0,
    end: 5,
  },
};

export const loadedDataMock = {
  courses: [
    {
      id: "1",
      description: "test desc",
      lessonsCount: 3,
      rating: 4,
      title: "Test Title",
      previewImageLink: "link",
      meta: {
        skills: [],
        courseVideoPreview: { link: "link", previewImageLink: "link" },
      },
    },
  ],
  currentPage: 1,
  setCurrentPage: () => {},
  coursesArrayBounds: {
    start: 0,
    end: 5,
  },
};
