import type { Owner } from "../../../types/owners";

type Props = {
  owner: Owner;
};

export default function OwnerCard({ owner }: Props) {
  return (
    <div>
      <h2>{owner.name}</h2>
      <p>{owner.phone}</p>
    </div>
  );
}