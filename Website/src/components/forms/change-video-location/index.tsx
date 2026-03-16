import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/useFolders";
import React from "react";

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkSpace?: string;
  currentFolderName?: string;
  onSuccess?: () => void;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentWorkSpace,
  onSuccess,
}: Props) => {
  // WIP: wire up the use move folder
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkSpace!, onSuccess);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((f) => f.id === currentWorkSpace);
  return (
    <form className="flex flex-col" onSubmit={onFormSubmit}>
      <div className="boder-[1px] rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p>{workspace.name}</p>}
        <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
        {folder ? <p>{folder.name}</p> : "This video has no folder"}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-[1rem] text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xs text-base bg-[#222222] w-full"
            {...register("workspace_id")}
          >
            {workspaces.map((space) => (
              <option
                key={space.id}
                className="text-[#a4a4a4]"
                value={space.id}
              >
                {space.name}
              </option>
            ))}
          </select>
        </Label>

        {isFetching ? (
          <Skeleton className="w-full h-[40px] rounded-xl" />
        ) : (
          <Label className="flex flex-col gap-y-2">
            <p className="text-xs">Folders in this workspace</p>
            {isFolders && isFolders.length > 0 ? (
              <select
                {...register('folder_id')}
                className="rounded-xs bg-[#222222] text-base w-full"
              >
                <option value="">None</option>
                {isFolders.map((folder) => (
                  <option
                    className="text-[#a4a4a4]"
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-[#a4a4a4]">This workspace has no folders</p>
            )}
          </Label>
        )}
      </div>

      <Button className="bg-white text-black hover:bg-[#a8a8a8] cursor-pointer mt-8 h-7">
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
