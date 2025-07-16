// components/email-phone-username.tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";

const UsernameEmail = () => {
  return (
    <div className="space-y-6 p-6 h-full">
      <div>

        <h2 className="text-2xl font-semibold">Email, phone, username</h2>
        <p className="text-sm text-muted-foreground">
          Configure how users can sign in to your application.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email address</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with their email address
            </p>
          </div>
          <Switch checked />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification code</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with a one-time passcode sent to the email address
            </p>
          </div>
          <Switch checked />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <Label>Email verification link</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in with an email verification link
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4 opacity-60">
          <div>
            <Label>Phone number</Label>
            <p className="text-sm text-muted-foreground">
              Users can sign in via SMS (Pro plan required)
            </p>
          </div>
          <Switch disabled />
        </div>
      </div>
    </div>
  )
}

export default UsernameEmail