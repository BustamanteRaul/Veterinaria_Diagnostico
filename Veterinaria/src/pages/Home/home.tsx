import { useEffect, useState, useRef } from "react";
import type { Owner } from "../../types/owners";
import type { Pet } from "../../types/pets";
import type { Visit } from "../../types/visits";
import { createOwner, getOwners } from "../../api/ownersApi";
import { createPet, getPets, getPetsByOwnerId } from "../../api/petsApi";
import { createVisit, getVisits } from "../../api/visitsApi";
import { createBill } from "../../api/billsApi";

type Tab = "owner" | "pet" | "visit" | "bill";

interface SearchDropdownProps {
  placeholder: string;
  options: { value: number; label: string }[];
  value: number | "";
  onChange: (value: number) => void;
  disabled?: boolean;
}

function SearchDropdown({ placeholder, options, value, onChange, disabled }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => { setOpen((o) => !o); setQuery(""); }}
        className={`w-full px-3 py-2 text-sm text-left border rounded-lg transition flex justify-between items-center ${
          disabled
            ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }`}
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400">No results found</li>
            ) : (
              filtered.map((o) => (
                <li
                  key={o.value}
                  onClick={() => { onChange(o.value); setOpen(false); setQuery(""); }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700 ${
                    o.value === value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                  }`}
                >
                  {o.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" />
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("owner");
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [owners, setOwners] = useState<Owner[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);

  const [ownerForm, setOwnerForm] = useState({ name: "", phone: "" });

  const [petOwnerId, setPetOwnerId] = useState<number | "">("");
  const [petForm, setPetForm] = useState({ name: "", species: "", breed: "", sex: "", birth_date: "", weight: "", notes: "" });

  const [visitPetId, setVisitPetId] = useState<number | "">("");
  const [visitForm, setVisitForm] = useState({ visit_date: "", reason: "", notes: "" });

  const [billOwnerId, setBillOwnerId] = useState<number | "">("");
  const [billPets, setBillPets] = useState<Pet[]>([]);
  const [billPetId, setBillPetId] = useState<number | "">("");
  const [billVisits, setBillVisits] = useState<Visit[]>([]);
  const [billVisitId, setBillVisitId] = useState<number | "">("");
  const [billForm, setBillForm] = useState({ amount: "", payment_date: "", paid: "0" });

  useEffect(() => {
    getOwners().then(setOwners).catch(console.error);
    getPets().then(setPets).catch(console.error);
    getVisits().then(setVisits).catch(console.error);
  }, []);

  const handleBillOwnerChange = async (ownerId: number) => {
    setBillOwnerId(ownerId);
    setBillPetId("");
    setBillVisitId("");
    setBillVisits([]);
    try {
      setBillPets(await getPetsByOwnerId(ownerId));
    } catch { setBillPets([]); }
  };

  const handleBillPetChange = (petId: number) => {
    setBillPetId(petId);
    setBillVisitId("");
    setBillVisits(visits.filter((v) => v.pet_id === petId));
  };

  const showStatus = (type: "success" | "error", msg: string) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus(null), 3500);
  };

  const handleOwnerSubmit = async () => {
    if (!ownerForm.name || !ownerForm.phone) return showStatus("error", "Please fill all fields.");
    try {
      await createOwner({ name: ownerForm.name, phone: Number(ownerForm.phone) });
      setOwnerForm({ name: "", phone: "" });
      setOwners(await getOwners());
      showStatus("success", "Owner added successfully.");
    } catch { showStatus("error", "Failed to add owner."); }
  };

  const handlePetSubmit = async () => {
    const { name, species, breed, sex, birth_date, weight } = petForm;
    if (!petOwnerId || !name || !species || !breed || !sex || !birth_date || !weight)
      return showStatus("error", "Please fill all required fields.");
    try {
      await createPet({
        owner_id: petOwnerId as number,
        name, species, breed, sex,
        birth_date,        // ✅ plain YYYY-MM-DD string — no new Date()
        weight: Number(weight),
        notes: petForm.notes,
      });
      setPetOwnerId("");
      setPetForm({ name: "", species: "", breed: "", sex: "", birth_date: "", weight: "", notes: "" });
      setPets(await getPets());
      showStatus("success", "Pet added successfully.");
    } catch { showStatus("error", "Failed to add pet."); }
  };

  const handleVisitSubmit = async () => {
    const { visit_date, reason } = visitForm;
    if (!visitPetId || !visit_date || !reason)
      return showStatus("error", "Please fill all required fields.");
    try {
      await createVisit({
        pet_id: visitPetId as number,
        visit_date,        // ✅ plain YYYY-MM-DD string
        reason,
        notes: visitForm.notes,
      });
      setVisitPetId("");
      setVisitForm({ visit_date: "", reason: "", notes: "" });
      setVisits(await getVisits());
      showStatus("success", "Visit added successfully.");
    } catch { showStatus("error", "Failed to add visit."); }
  };

  const handleBillSubmit = async () => {
    const { amount, payment_date } = billForm;
    if (!billVisitId || !amount || !payment_date)
      return showStatus("error", "Please fill all required fields.");
    try {
      await createBill({
        visit_id: billVisitId as number,
        amount: Number(amount),
        payment_date,      // ✅ plain YYYY-MM-DD string
        paid: billForm.paid === "1",
      });
      setBillOwnerId(""); setBillPetId(""); setBillVisitId("");
      setBillPets([]); setBillVisits([]);
      setBillForm({ amount: "", payment_date: "", paid: "0" });
      showStatus("success", "Bill added successfully.");
    } catch { showStatus("error", "Failed to add bill."); }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "owner", label: "Owner" },
    { id: "pet", label: "Pet" },
    { id: "visit", label: "Visit" },
    { id: "bill", label: "Bill" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Veterinary Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new record to any table</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 flex flex-col gap-4">

            {activeTab === "owner" && (
              <>
                <Field label="Full name">
                  <Input placeholder="e.g. Carlos Méndez" value={ownerForm.name}
                    onChange={(e) => setOwnerForm((f) => ({ ...f, name: e.target.value }))} />
                </Field>
                <Field label="Phone">
                  <Input placeholder="e.g. +54 11 4523 7890" value={ownerForm.phone}
                    onChange={(e) => setOwnerForm((f) => ({ ...f, phone: e.target.value }))} />
                </Field>
              </>
            )}

            {activeTab === "pet" && (
              <>
                <Field label="Owner">
                  <SearchDropdown
                    placeholder="Search owner..."
                    options={owners.map((o) => ({ value: o.id_owner, label: o.name }))}
                    value={petOwnerId}
                    onChange={(v) => setPetOwnerId(v)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name">
                    <Input placeholder="e.g. Rocky" value={petForm.name}
                      onChange={(e) => setPetForm((f) => ({ ...f, name: e.target.value }))} />
                  </Field>
                  <Field label="Species">
                    <Input placeholder="e.g. Dog" value={petForm.species}
                      onChange={(e) => setPetForm((f) => ({ ...f, species: e.target.value }))} />
                  </Field>
                  <Field label="Breed">
                    <Input placeholder="e.g. Labrador" value={petForm.breed}
                      onChange={(e) => setPetForm((f) => ({ ...f, breed: e.target.value }))} />
                  </Field>
                  <Field label="Sex">
                    <Select value={petForm.sex}
                      onChange={(e) => setPetForm((f) => ({ ...f, sex: e.target.value }))}>
                      <option value="">Select...</option>
                      <option value="0">Female</option>
                      <option value="1">Male</option>
                    </Select>
                  </Field>
                  <Field label="Birth date">
                    <Input type="date" value={petForm.birth_date}
                      onChange={(e) => setPetForm((f) => ({ ...f, birth_date: e.target.value }))} />
                  </Field>
                  <Field label="Weight (kg)">
                    <Input type="number" step="0.1" placeholder="e.g. 12.5" value={petForm.weight}
                      onChange={(e) => setPetForm((f) => ({ ...f, weight: e.target.value }))} />
                  </Field>
                </div>
                <Field label="Notes (optional)">
                  <Textarea placeholder="Any relevant medical notes..." value={petForm.notes}
                    onChange={(e) => setPetForm((f) => ({ ...f, notes: e.target.value }))} />
                </Field>
              </>
            )}

            {activeTab === "visit" && (
              <>
                <Field label="Pet">
                  <SearchDropdown
                    placeholder="Search pet..."
                    options={pets.map((p) => ({ value: p.id_pet, label: p.name }))}
                    value={visitPetId}
                    onChange={(v) => setVisitPetId(v)}
                  />
                </Field>
                <Field label="Visit date">
                  <Input type="date" value={visitForm.visit_date}
                    onChange={(e) => setVisitForm((f) => ({ ...f, visit_date: e.target.value }))} />
                </Field>
                <Field label="Reason">
                  <Input placeholder="e.g. Annual checkup" value={visitForm.reason}
                    onChange={(e) => setVisitForm((f) => ({ ...f, reason: e.target.value }))} />
                </Field>
                <Field label="Notes (optional)">
                  <Textarea placeholder="Details about the visit..." value={visitForm.notes}
                    onChange={(e) => setVisitForm((f) => ({ ...f, notes: e.target.value }))} />
                </Field>
              </>
            )}

            {activeTab === "bill" && (
              <>
                <Field label="Owner">
                  <SearchDropdown
                    placeholder="Search owner..."
                    options={owners.map((o) => ({ value: o.id_owner, label: o.name }))}
                    value={billOwnerId}
                    onChange={handleBillOwnerChange}
                  />
                </Field>
                <Field label="Pet">
                  <SearchDropdown
                    placeholder={billOwnerId ? "Search pet..." : "Select an owner first"}
                    options={billPets.map((p) => ({ value: p.id_pet, label: p.name }))}
                    value={billPetId}
                    onChange={handleBillPetChange}
                    disabled={!billOwnerId}
                  />
                </Field>
                <Field label="Visit">
                  <SearchDropdown
                    placeholder={billPetId ? "Select a visit..." : "Select a pet first"}
                    options={billVisits.map((v) => ({
                      value: v.id_visit,
                      label: `${String(v.visit_date).slice(0, 10)} — ${v.reason}`,
                    }))}
                    value={billVisitId}
                    onChange={(v) => setBillVisitId(v)}
                    disabled={!billPetId}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Amount ($)">
                    <Input type="number" step="0.01" placeholder="e.g. 3500" value={billForm.amount}
                      onChange={(e) => setBillForm((f) => ({ ...f, amount: e.target.value }))} />
                  </Field>
                  <Field label="Payment date">
                    <Input type="date" value={billForm.payment_date}
                      onChange={(e) => setBillForm((f) => ({ ...f, payment_date: e.target.value }))} />
                  </Field>
                </div>
                <Field label="Paid">
                  <Select value={billForm.paid}
                    onChange={(e) => setBillForm((f) => ({ ...f, paid: e.target.value }))}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Select>
                </Field>
              </>
            )}

            {status && (
              <p className={`text-sm px-3 py-2 rounded-lg border ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                {status.msg}
              </p>
            )}

            <button
              onClick={
                activeTab === "owner" ? handleOwnerSubmit
                : activeTab === "pet" ? handlePetSubmit
                : activeTab === "visit" ? handleVisitSubmit
                : handleBillSubmit
              }
              className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
