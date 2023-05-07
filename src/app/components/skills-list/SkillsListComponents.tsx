import { ISkillsListProps } from "./models";

export const SkillsList: React.FC<ISkillsListProps> = ({ skills }) => {
  if (!skills) return <>No skills</>;

  return (
    <>
      Skills:
      {skills.map((skill: string, id: number) => (
        <li key={id}>{skill}</li>
      ))}
    </>
  );
};
