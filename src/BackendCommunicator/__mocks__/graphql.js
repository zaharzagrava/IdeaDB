
const loadKnowledgeFilesResponse1 = {
  data: {
    getKnowledgeFiles: [
      {
        id: "29",
        lastDateTimeModified: "2020-09-12T05:03:52.660Z",
        srcText: "35"
      },
      {
        id: "26",
        lastDateTimeModified: "2020-09-11T11:03:58.130Z",
        srcText: "any"
      },
      {
        id: "23",
        lastDateTimeModified: "2020-09-10T08:28:56.608Z",
        srcText: "Parents:↵  Ids:↵    - Equation"
      }
    ]
  }
}
export const loadKnowledgeFiles = async () => {
  
  return await new Promise((resolve) => {
    resolve(loadKnowledgeFilesResponse1)
  })

}