import { useEffect, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import { apiService } from "@/api/apiService";
import { useQueryParam } from "@/hooks/useQueryParam";
import { getLocalStorageItem } from "@/utils/storage";
import { formatDate } from "@/utils/tools";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { GoPencil } from "react-icons/go";
import { AlertDialog } from "@/components/costum/AlertDialog/AlertDialog";
import Dialog from "@/components/costum/Dialog";
import ResetGhDialogBox from "./ResetGhDialogBox";
import RemoveGhDialogBox from "./RemoveGhDialogBox";

const GhSettings = () => {
  //   const [reqPatData, setReqPatData] = useState<any>({});
  const [ghData, setGhData] = useState<any>({});
  const { addToast } = useToast();

  console.log(ghData);
  const [isGhResetDiaOpen, setIsGhResetDiaOpen] = useState(false);
  const inputGhResetDiaRef = useRef<any>(null);
  const [isGhResetAlrOpen, setIsGhResetAlrOpen] = useState(false);
  
  const [isGhRemoveDiaOpen, setIsGhRemoveDiaOpen] = useState(false);
  const inputGhRemoveDiaRef = useRef<any>(null);
  const [isGhRemoveAlrOpen, setIsGhRemoveAlrOpen] = useState(false);

  const username = useQueryParam("username");

  const userId = getLocalStorageItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqData = {
          userId,
          ghUsername: username,
        };

        const get_data = await apiService.getGhAccountDetails(reqData);

        if (get_data.status === true) {
          setGhData(get_data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="flex flex-col gap-16">
      <div className="w-[80%] bg-vol-50 rounded-lg">
        <div className="px-5 py-5 flex flex-col gap-1">
          <span className="font-medium">Your Github Account Details</span>
          {/* <span className="text-xs text-cgray-ntext">
            This is the token that you provided when adding your github account.
          </span> */}
        </div>
        <div className="bg-white rounded-lg border m-[0.10rem]">
          <div className="flex justify-between items-center px-5 py-5">
            <div className="text-cgray-dtext flex flex-col gap-4">
              <div className="font-medium flex items-center gap-2">
                <img
                  src={ghData?.avatarUrl}
                  className="w-8 h-8 rounded-full border-3 "
                />
                <span className="font-semibold">{ghData?.username}</span>
              </div>

              <div className="text-xs text-cgray-ntext font-medium flex items-center gap-2 bg-vol-50 py-1 px-2 rounded-sm">
                <span>{ghData?.accUrl}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-cgray-ntext">Added on</span>
              <span className="text-[0.9rem] text-cgray-dtext">
                {ghData?.createdAt && formatDate(ghData?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] bg-red-50 rounded-lg">
        <div className="px-5 py-5 flex flex-col gap-1">
          <span className="font-medium text-red-700">Danger Zone</span>
          <span className="text-xs text-red-500">
            These actions might not be reversible.
          </span>
        </div>
        <div className="bg-white rounded-t-lg custom-bottom-dashed border-b border-l border-r border-t ml-[0.10rem] mr-[0.10rem]">
          <div className="flex justify-between items-center px-5 py-5">
            <div className="text-cgray-dtext flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-cgray-dtext">
                  Remove this github account
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-cgray-ntext">
                  Once you remove the account, there is no going back.
                </span>
              </div>
            </div>

            <button onClick={() => setIsGhRemoveAlrOpen(true)} className="red-button">Remove this github account</button>
          </div>
        </div>

        <div className="bg-white rounded-b-lg border-b border-l border-r mr-[0.10rem] ml-[0.10rem]">
          <div className="flex justify-between items-center px-5 py-5">
            <div className="text-cgray-dtext flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-cgray-dtext">
                  Reset this github account
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-cgray-ntext">
                  Once you reset the account, you will not be getting old data back.
                </span>
              </div>
            </div>

            <button onClick={() => setIsGhResetAlrOpen(true)} className="red-button">Reset account</button>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={isGhResetDiaOpen}
        onClose={() => setIsGhResetDiaOpen(false)}
        title="Reset Github Account"
        initialFocusRef={inputGhResetDiaRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        // headerClassName="bg-gray-50"
        bodyClassName="bg-white"
        // footerClassName="bg-gray-50"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <ResetGhDialogBox ghData={ghData}/>
      </Dialog>

      <AlertDialog
        isOpen={isGhResetAlrOpen}
        onClose={() => setIsGhResetAlrOpen(false)}
        title="Confirm Reset Account"
        type="error"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={() => setIsGhResetDiaOpen(true)}
      >
        Are you sure you want to reset this Account?
      </AlertDialog>

      <Dialog
        isOpen={isGhRemoveDiaOpen}
        onClose={() => setIsGhRemoveDiaOpen(false)}
        title="Remove Github Account"
        initialFocusRef={inputGhRemoveDiaRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        // headerClassName="bg-gray-50"
        bodyClassName="bg-white"
        // footerClassName="bg-gray-50"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <RemoveGhDialogBox ghData={ghData}/>
      </Dialog>

      <AlertDialog
        isOpen={isGhRemoveAlrOpen}
        onClose={() => setIsGhRemoveAlrOpen(false)}
        title="Confirm Remove Account"
        type="error"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={() => setIsGhRemoveDiaOpen(true)}
      >
        Are you sure you want to remove this Account?
      </AlertDialog>
    </div>
  );
};

export default GhSettings;
