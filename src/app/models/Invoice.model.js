import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    // Invoice Identification
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // References
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    },

    // Period
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    },

    // Line Items
    lineItems: [{
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        }
    }],

    // Amounts
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    gstPercentage: {
        type: Number,
        default: 18,
        min: 0,
        max: 100
    },
    gst: {
        type: Number,
        required: true,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    paidAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    balanceAmount: {
        type: Number,
        required: true,
        min: 0
    },

    // Payment Details
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'partial', 'overdue', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['UPI', 'Bank Transfer', 'Card', 'Cash', 'Cheque', 'Other']
    },
    paymentDate: {
        type: Date
    },
    transactionId: {
        type: String,
        trim: true
    },

    // GST Details
    gstNumber: {
        type: String,
        trim: true
    },

    // Invoice Dates
    invoiceDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },

    // PDF
    pdfUrl: {
        type: String,
        trim: true
    },

    // Notes
    notes: {
        type: String
    },

    // Billing Address
    billingAddress: {
        companyName: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        country: { type: String, default: 'India' }
    }
}, {
    timestamps: true
});

// Auto-generate invoice number if not provided
InvoiceSchema.pre('save', async function (next) {
    if (!this.invoiceNumber) {
        const year = this.year.toString().slice(-2);
        const month = this.month.toString().padStart(2, '0');
        const count = await mongoose.model('Invoice').countDocuments({
            year: this.year,
            month: this.month
        });
        this.invoiceNumber = `D2D${year}${month}${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

// Indexes for better query performance
InvoiceSchema.index({ brandId: 1 });
InvoiceSchema.index({ campaignId: 1 });
InvoiceSchema.index({ paymentStatus: 1 });
InvoiceSchema.index({ month: 1, year: 1 });
InvoiceSchema.index({ invoiceDate: 1 });

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);

export default Invoice;
