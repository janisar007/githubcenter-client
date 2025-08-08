import { apiService } from "@/api/apiService";
import { Form, type FormField } from "@/components/costum/Form";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { useQueryParam } from "@/hooks/useQueryParam";
import { getLocalStorageItem } from "@/utils/storage";
import { useUser } from "@clerk/clerk-react";
import { RiGitRepositoryLine } from "react-icons/ri";
import { z } from "zod";

// 1. Define validation schema
const userSchema = z.object({
  groupName: z.string().min(2, "Name must be at least 2 characters"),
  repositories: z.any().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

// 2. Define form fields

// 3. Define form component
const AddGroupDialogBox = ({ repoOption }: any) => {
  const { addToast } = useToast();
  const username = useQueryParam("username");

  const userId = getLocalStorageItem("userId");
  const { user } = useUser();
  const clerkId = user?.id;

  // console.log(repoOption)

  const userFormFields: FormField[] = [
    {
      name: "groupName",
      label: "Group Name",
      type: "text",
      placeholder: "Nodejs repos",
      validation: z.string().min(2),
      className: "col-span-2",
    },
    {
      name: "repositories",
      label: "Repositories",
      type: "multiselect",
      options: repoOption,
      renderSelected: (option) => (
        <span key={option.value} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
          {option.label}
        </span>
      ),
      renderOption: (option) => (
        <div className="flex items-center">
          <RiGitRepositoryLine className="mr-2" />
          {option.label}
        </div>
      ),
      // maxSelections: 2,
      className: "col-span-2",
    },
  ];

  const handleSubmit = async (data: any) => {
    const reqData = {
      ...data,
      userId,
      clerkId,
      ghUsername:username,
    };

    console.log(data);

    try {
      const post_data = await apiService.createGroupAndAddRepo(reqData);
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
        message: "Group created successfully",
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
    <div className="max-w-2xl mx-auto p-2 bg-white rounded-lg">
      <Form<UserFormData>
        fields={userFormFields}
        onSubmit={handleSubmit}
        schema={userSchema}
        // defaultValues={initialData}
        formClassName="grid grid-cols-2 gap-4"
        submitButtonClassName="blue-button"
        resetButtonClassName="white-button"
        buttonsContainerClassName="flex space-x-3 justify-end mt-6 col-span-2"
      />
    </div>
  );
};

export default AddGroupDialogBox;
