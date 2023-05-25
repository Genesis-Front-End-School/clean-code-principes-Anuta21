import { ISkillsListProps } from "./models";

export const SkillsList: React.FC<ISkillsListProps> = ({ skills }) => {
  if (!skills) return <>No skills</>;

  return (
    <div>
      Skills:
      {skills.map((skill: string, id: number) => (
        <li key={id} aria-label="skill">
          {skill}
        </li>
      ))}
    </div>
  );
};
