"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

// Sample health conditions dataset
const healthConditions = [
  { value: "asthma", label: "Asthma" },
  { value: "diabetes", label: "Diabetes" },
  { value: "hypertension", label: "Hypertension" },
  { value: "migraine", label: "Migraine" },
  { value: "arthritis", label: "Arthritis" },
  { value: "anxiety", label: "Anxiety" },
  { value: "depression", label: "Depression" },
  { value: "autism", label: "Autism Spectrum Disorder (ASD)" },
  { value: "adhd", label: "Attention Deficit Hyperactivity Disorder (ADHD)" },
  { value: "eczema", label: "Eczema" },
  { value: "fibromyalgia", label: "Fibromyalgia" },
  { value: "ibd", label: "Inflammatory Bowel Disease (IBD)" },
  { value: "crohn", label: "Crohn's Disease" },
  { value: "ulcerative_colitis", label: "Ulcerative Colitis" },
  { value: "sickle_cell_anemia", label: "Sickle Cell Anemia" },
  { value: "psoriasis", label: "Psoriasis" },
  { value: "lupus", label: "Systemic Lupus Erythematosus (Lupus)" },
  { value: "sleep_apnea", label: "Sleep Apnea" },
  { value: "tbi", label: "Traumatic Brain Injury (TBI)" },
  { value: "ptsd", label: "Post-Traumatic Stress Disorder (PTSD)" },
  { value: "cerebral_palsy", label: "Cerebral Palsy" },
  { value: "obesity", label: "Obesity" },
  { value: "chronic_fatigue_syndrome", label: "Chronic Fatigue Syndrome (ME/CFS)" },
  { value: "multiple_sclerosis", label: "Multiple Sclerosis (MS)" },
  { value: "parkinson_disease", label: "Parkinson's Disease" },
  { value: "alzheimers_disease", label: "Alzheimer's Disease" },
  { value: "bipolar_disorder", label: "Bipolar Disorder" },
  { value: "schizophrenia", label: "Schizophrenia" },
  { value: "cystic_fibrosis", label: "Cystic Fibrosis" },
  { value: "congenital_heart_defect", label: "Congenital Heart Defect" },
  { value: "hearing_loss", label: "Hearing Loss" },
  { value: "vision_impairment", label: "Vision Impairment" },
  { value: "spinal_cord_injury", label: "Spinal Cord Injury" },
  { value: "stroke", label: "Stroke" },
  { value: "kidney_disease", label: "Chronic Kidney Disease" },
  { value: "liver_disease", label: "Liver Disease" },
  { value: "hemophilia", label: "Hemophilia" },
  { value:"other_specify_condition","label":"Other(Specify Condition)"},
];


export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    gender: "",
    emergencyContact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    healthConditions: [],
    otherHealthCondition: "", // For custom input when 'Other' is selected
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested emergencyContact fields
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        emergencyContact: {
          ...formData.emergencyContact,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleHealthConditionsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      healthConditions: selectedOptions,
      otherHealthCondition:
        selectedOptions.find((option) => option.value === "other") ? "" : formData.otherHealthCondition,
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#2d2d2d", // Dark background for the control
      borderColor: state.isFocused ? "#4a90e2" : "#444", // Highlighted border on focus
      color: "#fff", // Text color
      boxShadow: state.isFocused ? "0 0 0 1px #4a90e2" : "none",
      "&:hover": {
        borderColor: "#4a90e2",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#333", // Dark background for the dropdown menu
      color: "#fff", // Text color
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "#333", // Matches the menu background
      color: "#fff", // Ensures text is visible
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4a90e2" : state.isFocused ? "#555" : "transparent",
      color: state.isSelected ? "#fff" : "#ddd",
      "&:hover": {
        backgroundColor: "#555",
        color: "#fff",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa", // Placeholder text color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // Selected value text color
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff", // Search input text color
    }),
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Sign up the user with email, password, and metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            age: parseInt(formData.age),
            gender: formData.gender,
            emergency_contact_first_name: formData.emergencyContact.firstName,
            emergency_contact_last_name: formData.emergencyContact.lastName,
            emergency_contact_phone_number: formData.emergencyContact.phoneNumber,
            health_conditions:
              formData.healthConditions.map((condition) => condition.label).join(", ") +
              (formData.otherHealthCondition ? `, ${formData.otherHealthCondition}` : ""),
            country: formData.country,
          },
        },
      });
  
      if (authError) throw authError;
  
      alert("Signup successful! Please check your email to confirm your account.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  onChange={(selectedOption) => handleChange({ target: { name: "gender", value: selectedOption.value } })}
                  styles={customStyles}
                  placeholder="Select gender"
                />
              </div>

              {/* Emergency Contact Fields */}
              <div>
                <Label>Emergency Contact - First Name</Label>
                <Input
                  type="text"
                  id="emergencyContact.firstName"
                  name="emergencyContact.firstName"
                  value={formData.emergencyContact.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Emergency Contact - Last Name</Label>
                <Input
                  type="text"
                  id="emergencyContact.lastName"
                  name="emergencyContact.lastName"
                  value={formData.emergencyContact.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Emergency Contact - Phone Number</Label>
                <Input
                  type="tel"
                  id="emergencyContact.phoneNumber"
                  name="emergencyContact.phoneNumber"
                  value={formData.emergencyContact.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Multi-Select Dropdown for Health Conditions */}
              <div>
                <Label htmlFor="healthConditions">Relevant Health Conditions</Label>
                <Select
                  isMulti
                  options={healthConditions}
                  onChange={handleHealthConditionsChange}
                  styles={customStyles}
                  placeholder="Search and select health conditions"
                />
              </div>

              {/* Other Health Condition Input */}
              {formData.healthConditions.some((condition) => condition.value === "other") && (
                <div>
                  <Label htmlFor="otherHealthCondition">Specify Other Health Condition</Label>
                  <Input
                    type="text"
                    id="otherHealthCondition"
                    name="otherHealthCondition"
                    value={formData.otherHealthCondition}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Country Field */}
              <div>
                <Label htmlFor="country">Country</Label>
                <Input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>Health Questionnaire Placeholder</>
        )}
      </div>
    </div>
  );
}
