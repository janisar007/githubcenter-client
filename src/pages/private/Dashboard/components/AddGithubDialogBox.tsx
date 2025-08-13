import { apiService } from "@/api/apiService";
import { Form, type FormField } from "@/components/costum/Form";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { getLocalStorageItem } from "@/utils/storage";
import { useUser } from "@clerk/clerk-react";
import { z } from "zod";

// 1. Define validation schema
const userSchema = z.object({
  patName: z.string().min(2, "Name must be at least 2 characters"),
  pat: z.string().min(10, "Invalid PAT"),
});

type UserFormData = z.infer<typeof userSchema>;

// 2. Define form fields
const userFormFields: FormField[] = [
  {
    name: "patName",
    label: "Pat Name",
    type: "text",
    placeholder: "MY_PAT",
    validation: z.string().min(2),
    className: "col-span-2",
  },
  {
    name: "pat",
    label: "PAT(Personal Access Token)",
    type: "text",
    placeholder: "trffeumy7rb74gbnf489hnf7hfink8sr33khyf",
    className: "col-span-2",
  },
];

// 3. Define form component
const AddGithubDialogBox = ({
  initialData,
}: {
  initialData?: Partial<UserFormData>;
}) => {
  const { addToast } = useToast();

  const userId = getLocalStorageItem("userId");
  const { user } = useUser();
  const clerkId = user?.id;

  const handleSubmit = async (data: UserFormData) => {
    const reqData = {
      ...data,
      userId,
      clerkId,
    };

    try {
      const post_data = await apiService.addPat(reqData);

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
        message: "Github added Successfully",
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
    <div className="max-w-2xl mx-auto p-2 bg-white rounded-lg flex flex-col gap-2">
      <span className="text-[0.70rem] leading-[1rem] mb-4 text-blue-600">🔒 Your Personal Access Token (PAT) is encrypted and securely stored on our servers. We never send it to your browser after saving. The backend code handling this is <span onClick={() => window.open("https://github.com/janisar007/github-center-api", "_blank")} className="text-blue-800 font-semibold underline hover:text-blue-700 cursor-pointer">open source </span>for full transparency.</span>
        
      <Form<UserFormData>
        fields={userFormFields}
        onSubmit={handleSubmit}
        schema={userSchema}
        defaultValues={initialData}
        formClassName="grid grid-cols-2 gap-4"
        submitButtonClassName="blue-button"
        resetButtonClassName="white-button"
        buttonsContainerClassName="flex space-x-3 justify-end mt-6 col-span-2"
      />
    </div>
  );
};

export default AddGithubDialogBox;
