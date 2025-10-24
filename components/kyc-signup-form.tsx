"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

interface KYCFormData {
  // Step 1: Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string

  // Step 2: Business Info
  businessName: string
  businessType: string
  businessCategory: string
  businessRegistration: string
  taxId: string

  // Step 3: Verification
  businessAddress: string
  city: string
  state: string
  country: string
  agreeToTerms: boolean
}

const BUSINESS_TYPES = ["Sole Proprietor", "Partnership", "Limited Company", "Cooperative", "NGO", "Other"]

const BUSINESS_CATEGORIES = [
  "Retail",
  "E-commerce",
  "Services",
  "Manufacturing",
  "Agriculture",
  "Technology",
  "Fashion",
  "Food & Beverage",
  "Other",
]

export default function KYCSignupForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<KYCFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    businessCategory: "",
    businessRegistration: "",
    taxId: "",
    businessAddress: "",
    city: "",
    state: "",
    country: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\+?[0-9]{10,}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Invalid phone number"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required"
    if (!formData.businessType) newErrors.businessType = "Business type is required"
    if (!formData.businessCategory) newErrors.businessCategory = "Business category is required"
    if (!formData.businessRegistration.trim())
      newErrors.businessRegistration = "Business registration number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State/Province is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep3()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessCategory: formData.businessCategory,
          id: Math.random().toString(36).substr(2, 9),
        }),
      )

      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (err) {
      setErrors({ submit: "Signup failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">V</span>
            </div>
            <span className="text-2xl font-bold">Vendra Lite</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Complete your KYC verification to get started</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    s < step
                      ? "bg-primary text-primary-foreground"
                      : s === step
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${s < step ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Personal Info</span>
            <span>Business Details</span>
            <span>Verification</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={loading}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={loading}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  <p className="text-xs text-muted-foreground">Minimum 8 characters required</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.confirmPassword ? "border-destructive" : ""}
                  />
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-6">Business Details</h2>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.businessName ? "border-destructive" : ""}
                  />
                  {errors.businessName && <p className="text-xs text-destructive">{errors.businessName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
                        errors.businessType ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Select type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && <p className="text-xs text-destructive">{errors.businessType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessCategory">Business Category</Label>
                    <select
                      id="businessCategory"
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
                        errors.businessCategory ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Select category</option>
                      {BUSINESS_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.businessCategory && <p className="text-xs text-destructive">{errors.businessCategory}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessRegistration">Business Registration Number</Label>
                  <Input
                    id="businessRegistration"
                    name="businessRegistration"
                    placeholder="e.g., RC123456"
                    value={formData.businessRegistration}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.businessRegistration ? "border-destructive" : ""}
                  />
                  {errors.businessRegistration && (
                    <p className="text-xs text-destructive">{errors.businessRegistration}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID (Optional)</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    placeholder="e.g., TIN123456"
                    value={formData.taxId}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl font-semibold mb-6">Verification & Compliance</h2>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input
                    id="businessAddress"
                    name="businessAddress"
                    placeholder="Street address"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.businessAddress ? "border-destructive" : ""}
                  />
                  {errors.businessAddress && <p className="text-xs text-destructive">{errors.businessAddress}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={loading}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={loading}
                      className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={loading}
                    className={errors.country ? "border-destructive" : ""}
                  />
                  {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-sm">Terms & Conditions</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By creating an account, you agree to our Terms of Service and Privacy Policy. You confirm that the
                    information provided is accurate and complete. Vendra Lite reserves the right to verify your
                    business information and may request additional documentation.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      disabled={loading}
                      className="mt-1"
                    />
                    <span className="text-xs">I agree to the Terms of Service and Privacy Policy</span>
                  </label>
                  {errors.agreeToTerms && <p className="text-xs text-destructive">{errors.agreeToTerms}</p>}
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm mb-4">{errors.submit}</div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={loading}
                  className="flex-1 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}

              {step < 3 ? (
                <Button type="button" onClick={handleNext} disabled={loading} className="flex-1">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating account..." : "Complete Signup"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
