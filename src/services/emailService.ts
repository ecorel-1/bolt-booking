import { ServiceDetails } from '../types/service';
import { Booking } from '../types/booking';
import { AuthUser } from '../types/auth';

class EmailService {
  async sendBookingConfirmation(
    user: AuthUser,
    booking: Booking,
    service: ServiceDetails
  ) {
    // In a real application, this would send an actual email
    // For now, we'll just log the email content
    console.log('Sending booking confirmation email:', {
      to: user.email,
      subject: 'Booking Confirmation - Adventure Booking',
      content: this.generateBookingConfirmationEmail(user, booking, service),
    });

    return true;
  }

  private generateBookingConfirmationEmail(
    user: AuthUser,
    booking: Booking,
    service: ServiceDetails
  ) {
    return `
      Dear ${user.name},

      Your booking has been confirmed!

      Booking Details:
      - Service: ${service.name}
      - Date: ${new Date(booking.date).toLocaleDateString()}
      - Time: ${booking.time}
      - Location: ${service.location.address}
      - Booking Reference: #${booking.id}

      ${service.rewardPoints > 0 ? `You'll earn ${service.rewardPoints} points for this booking!` : ''}

      Important Information:
      ${service.requirements?.map(req => `- ${req}`).join('\n') || 'No special requirements'}

      Need to make changes?
      You can manage your booking by logging into your dashboard at any time.

      Thank you for choosing Adventure Booking!

      Best regards,
      The Adventure Booking Team
    `;
  }
}

export const emailService = new EmailService();