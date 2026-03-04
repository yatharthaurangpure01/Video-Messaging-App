"use client";

import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";
import { FolderPlus } from "lucide-react";
import React from "react";

type Props = {
  workspaceId: string;
};

const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);
  return (
    <Button
      onClick={onCreateNewFolder}
      className="cursor-pointer bg-[#9D9D9D] text-black flex items-center gap-2 py-4 px-4 hover:bg-white hover:text-black"
    >
      <FolderPlus />
      Create Folder
    </Button>
  );
};

export default CreateFolders;
