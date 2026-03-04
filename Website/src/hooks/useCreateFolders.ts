import { createFolder } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolders = (workspaceid: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceid),
    "workspace-folders"
  );

  const onCreateNewFolder = () => {
    mutate({ name: "Untitled", id: "optimitsitc--id" });
  };
  
  return { onCreateNewFolder };
};
