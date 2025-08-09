import Dialog from "@/components/costum/Dialog";
import { useEffect, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import UpdatePatDialogBox from "./UpdatePatDialogBox";
import { apiService } from "@/api/apiService";
import { useQueryParam } from "@/hooks/useQueryParam";
import { getLocalStorageItem } from "@/utils/storage";
import { formatDate } from "@/utils/tools";
import { AlertDialog } from "@/components/costum/AlertDialog/AlertDialog";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { GoPencil } from "react-icons/go";
import RenamePatDialogBox from "./RenamePatDialogBox";

const PatSettings = () => {
  const [reqPatData, setReqPatData] = useState<any>({});
  const [patData, setPatData] = useState<any>({});
  const { addToast } = useToast();

  const [isPatUpdateOpen, setIsPatUpdateOpen] = useState(false);
  const inputPatUpdateRef = useRef<any>(null);

  const [isRenamePatOpen, setIsRenamePatOpen] = useState(false);
  const inputRenamePatRef = useRef<any>(null);

  const [isPatUpdateConfOpen, setIsPatUpdateConfOpen] = useState(false);

  const username = useQueryParam("username");
  const userId = getLocalStorageItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqData = {
          userId,
          ghUsername: username,
        };

        const get_data = await apiService.getPatDetails(reqData);

        if (get_data.status === true) {
          setPatData(get_data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleUpdatePat = async (reqPatData: any) => {
    try {
      const post_data = await apiService.updatePat(reqPatData);
      if (post_data.status === false) {
        addToast({
          message: post_data.message || "Something went wrong",
          type: "error",
          duration: 4000,
          closeButton: true,
          position: "top-center",
        });
        return;
      }
      addToast({
        message: "PAT updated successfully",
        type: "success",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
      
      window.location.reload();
    } catch (error) {
      console.error("Unexpected error:", error);
      addToast({
        message: "Unexpected error occurred",
        type: "error",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full px-4 md:px-8 py-6 flex justify-center">
      <div className="w-full max-w-4xl bg-vol-50 rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-5 py-4 flex flex-col gap-1">
          <span className="font-medium text-base sm:text-lg">
            Your PAT (Personal Access Token)
          </span>
          <span className="text-xs text-cgray-ntext">
            This is the token that you provided when adding your GitHub account.
          </span>
        </div>

        {/* Token Card */}
        <div className="bg-white rounded-lg border m-[0.10rem]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-5 gap-4">
            {/* Left side: Token Info */}
            <div className="text-cgray-dtext flex flex-col gap-2">
              <div className="font-medium flex items-center gap-2 text-sm sm:text-base">
                <span>{patData?.patName}</span>
                <span
                  onClick={() => setIsRenamePatOpen(true)}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  <GoPencil />
                </span>
              </div>
              <div className="text-xs flex flex-wrap items-center gap-1 text-cgray-ntext">
                <span>
                  {`Created at ${
                    patData?.createdAt && formatDate(patData?.createdAt)
                  }`}
                </span>
                <BsDot className="hidden sm:block" />
                <span>
                  {`Updated on ${
                    patData?.updatedAt && formatDate(patData?.updatedAt)
                  }`}
                </span>
              </div>
            </div>

            {/* Right side: Update Button */}

            <div className="">
              <button
                onClick={() => setIsPatUpdateOpen(true)}
                className="blue-button w-full sm:w-auto"
              >
                Update
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Update PAT Dialog */}
      <Dialog
        isOpen={isPatUpdateOpen}
        onClose={() => setIsPatUpdateOpen(false)}
        title="Update PAT"
        initialFocusRef={inputPatUpdateRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        bodyClassName="bg-white"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <UpdatePatDialogBox
          patName={patData?.patName}
          setReqPatData={setReqPatData}
          setIsPatUpdateConfOpen={setIsPatUpdateConfOpen}
        />
      </Dialog>

      {/* Rename PAT Dialog */}
      <Dialog
        isOpen={isRenamePatOpen}
        onClose={() => setIsRenamePatOpen(false)}
        title="Rename PAT"
        initialFocusRef={inputRenamePatRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        bodyClassName="bg-white"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <RenamePatDialogBox
          patName={patData?.patName}
          patId={patData?._id}
        />
      </Dialog>

      {/* Confirmation Alert */}
      <AlertDialog
        isOpen={isPatUpdateConfOpen}
        onClose={() => setIsPatUpdateConfOpen(false)}
        title="Confirm Update"
        type="info"
        confirmText="Update"
        cancelText="Cancel"
        onConfirm={() => handleUpdatePat(reqPatData)}
      >
        Are you sure you want to update the PAT?
      </AlertDialog>
    </div>
  );
};

export default PatSettings;
