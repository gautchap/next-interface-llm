type BadgeProps = {
    role: "user" | "ai";
};

export const Badge = ({ role }: BadgeProps) => {
    return (
        <div
            className={`flex size-12 items-center justify-center rounded border border-[#30343a] px-1 py-2 text-sm ${
                role === "ai" && "border-[#454056] text-[#a0a6ee]"
            }`}
        >
            {role.toUpperCase()}
        </div>
    );
};
