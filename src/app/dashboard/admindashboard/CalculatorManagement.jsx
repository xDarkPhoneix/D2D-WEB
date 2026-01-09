"use client"
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit } from "lucide-react";
import Card from "./components/Card";
import Button from "./components/Button";

export default function CalculatorManagement() {
    const [pricingRule, setPricingRule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchActivePricingRule();
    }, []);

    const fetchActivePricingRule = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/pricing/rules?active=true');
            const data = await response.json();

            if (data.success && data.data) {
                setPricingRule(data.data);
            } else {
                // Initialize with default structure if no active rule
                setPricingRule({
                    ruleName: 'Default Pricing Rule',
                    services: [],
                    packages: [],
                    cityMultipliers: new Map([
                        ['Delhi', 1.2],
                        ['Mumbai', 1.5],
                        ['Bangalore', 1.3],
                        ['Other', 1.0]
                    ]),
                    offlineShootBase: 5000,
                    offlineShootPerDay: 10000,
                    discounts: [],
                    isActive: true
                });
            }
        } catch (error) {
            console.error('Error fetching pricing rule:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const method = pricingRule._id ? 'PUT' : 'POST';
            const body = pricingRule._id
                ? { id: pricingRule._id, updates: pricingRule }
                : pricingRule;

            const response = await fetch('/api/admin/pricing/rules', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert('Pricing rule saved successfully!');
                setEditMode(false);
                fetchActivePricingRule();
            }
        } catch (error) {
            console.error('Error saving pricing rule:', error);
            alert('Failed to save pricing rule');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading pricing configuration...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Calculator Settings
                    </h1>
                    <p className="text-gray-600">
                        Configure pricing rules, packages, and city multipliers
                    </p>
                </div>
                <div className="flex gap-2">
                    {!editMode ? (
                        <Button variant="primary" onClick={() => setEditMode(true)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Settings
                        </Button>
                    ) : (
                        <>
                            <Button variant="default" onClick={() => {
                                setEditMode(false);
                                fetchActivePricingRule();
                            }}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Offline Shoot Pricing */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Offline Shoot Pricing
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Base Cost (₹)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                value={pricingRule?.offlineShootBase || 0}
                                onChange={(e) => setPricingRule({
                                    ...pricingRule,
                                    offlineShootBase: parseInt(e.target.value) || 0
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        ) : (
                            <div className="text-2xl font-bold text-gray-900">
                                ₹{pricingRule?.offlineShootBase?.toLocaleString() || 0}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Per Day Cost (₹)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                value={pricingRule?.offlineShootPerDay || 0}
                                onChange={(e) => setPricingRule({
                                    ...pricingRule,
                                    offlineShootPerDay: parseInt(e.target.value) || 0
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        ) : (
                            <div className="text-2xl font-bold text-gray-900">
                                ₹{pricingRule?.offlineShootPerDay?.toLocaleString() || 0}
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* City Multipliers */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    City Multipliers
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    {pricingRule?.cityMultipliers && Array.from(pricingRule.cityMultipliers).map(([city, multiplier]) => (
                        <div key={city} className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">{city}</div>
                            {editMode ? (
                                <input
                                    type="number"
                                    step="0.1"
                                    value={multiplier}
                                    onChange={(e) => {
                                        const newMultipliers = new Map(pricingRule.cityMultipliers);
                                        newMultipliers.set(city, parseFloat(e.target.value) || 1.0);
                                        setPricingRule({
                                            ...pricingRule,
                                            cityMultipliers: newMultipliers
                                        });
                                    }}
                                    className="mt-1 w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            ) : (
                                <div className="text-lg font-bold text-yellow-600">
                                    {multiplier}x
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Packages */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Packages
                    </h2>
                </div>

                {pricingRule?.packages && pricingRule.packages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingRule.packages.map((pkg, index) => (
                            <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {pkg.packageName}
                                </h3>
                                <div className="text-3xl font-bold text-yellow-600 mb-4">
                                    ₹{pkg.monthlyPrice?.toLocaleString()}/mo
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <div>📹 {pkg.reelsCount || 0} Reels</div>
                                    <div>📱 {pkg.postsCount || 0} Posts</div>
                                </div>
                                {pkg.inclusions && pkg.inclusions.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-300">
                                        <div className="text-xs font-semibold text-gray-600 mb-2">
                                            Inclusions:
                                        </div>
                                        <ul className="space-y-1 text-xs text-gray-600">
                                            {pkg.inclusions.map((item, i) => (
                                                <li key={i}>✓ {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No packages configured. Click "Edit Settings" to add packages.
                    </div>
                )}
            </Card>

            {/* Discounts */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Discount Rules
                    </h2>
                </div>

                {pricingRule?.discounts && pricingRule.discounts.length > 0 ? (
                    <div className="space-y-3">
                        {pricingRule.discounts.map((discount, index) => (
                            <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-gray-900">
                                            {discount.type.charAt(0).toUpperCase() + discount.type.slice(1)} Discount
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {discount.percentage}% off
                                        </div>
                                        {discount.conditions && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {discount.conditions}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {discount.percentage}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No discount rules configured. Click "Edit Settings" to add discounts.
                    </div>
                )}
            </Card>

            {/* Service Costs */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Service Costs
                </h2>
                {pricingRule?.services && pricingRule.services.length > 0 ? (
                    <div className="space-y-2">
                        {pricingRule.services.map((service, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-semibold text-gray-900">{service.serviceName}</div>
                                    <div className="text-sm text-gray-600">
                                        Base: ₹{service.basePrice} | Unit: ₹{service.unitPrice}/{service.unit}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No services configured. Services pricing will be available in advanced settings.
                    </div>
                )}
            </Card>
        </div>
    );
}
