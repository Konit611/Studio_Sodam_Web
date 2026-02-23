import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="py-4">
      <h2 className="mb-6 text-xl font-bold text-text-primary">프로필 설정</h2>
      <SettingsForm />
    </div>
  );
}
