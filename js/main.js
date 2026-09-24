 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

jQuery(document).ready(function($) {

	"use strict";

	var latestNotice = {
		title: 'APBU Foundation Scholarship & Education Support Drive',
		details: 'We are organising a special education support and scholarship awareness programme for deserving students across the region. Parents, guardians, and community members are invited to participate and learn about available assistance and enrolment support.',
		date: '12 October 2026',
		time: '10:30 AM',
		venue: 'APBU Foundation Community Centre, Midnapore, West Bengal'
	};

	if ($('.js-notification-bell').length === 0) {
		$('body').append('<button type="button" class="notification-bell js-notification-bell" aria-label="View latest notice"><span class="icon-bell" aria-hidden="true"></span><span class="notification-dot"></span></button>');
	}

	if ($('#support-chat-widget').length === 0) {
		$('body').append(`
			<div class="support-chat" id="support-chat-widget" aria-live="polite" style="display:none;">
				<div class="support-chat__header">
					<div class="support-chat__title"><span class="support-chat__status"></span>24x7 Support</div>
					<button type="button" class="support-chat__toggle" aria-label="Minimize support chat">–</button>
				</div>
				<div class="support-chat__messages">
					<div class="support-chat__message support-chat__message--bot">Hello! Ask anything about APBU Foundation.!</div>
				</div>
				<div class="support-chat__quick-replies">
					<button type="button" class="support-chat__chip">Emergency contact</button>
					<button type="button" class="support-chat__chip">Donation help</button>
				</div>
				<form class="support-chat__form">
					<input type="text" class="support-chat__input" placeholder="Type your question..." aria-label="Type your question" />
					<button type="submit" class="support-chat__send">Send</button>
				</form>
			</div>
		`);
	}

	if ($('.support-chat-icon').length === 0) {
		$('body').append('<button type="button" class="support-chat-icon" aria-label="Open support chat"><span class="icon-chat" aria-hidden="true"></span></button>');
	}

	var emergencyContactText = 'Emergency contact numbers: 7872136484, 7001682789, 9564023889, 9932905220.';

	var getSupportReply = function(message) {
		var text = (message || '').trim();
		if (!text) {
			return 'Please type your question. ' + emergencyContactText;
		}

		var lower = text.toLowerCase();
		if (/(hello|hi|hey|good morning|good evening|good afternoon)/.test(lower)) {
			return 'Hello! We are here to help you 24x7. ' + emergencyContactText + ' Please share your concern and we will guide you.';
		}
		if (/(donat|support|fund|money|payment|contribute)/.test(lower)) {
			return 'For donation or funding support, please get in touch with our team. ' + emergencyContactText + ' We can guide you on donation steps and programme support.';
		}
		if (/(educat|scholarship|student|child|help)/.test(lower)) {
			return 'For student support, education assistance, scholarship guidance, or child welfare enquiries, please contact us immediately. ' + emergencyContactText + ' We will help you with the next step.';
		}
		if (/(urgent|emergency|help now|immediate|danger|accident)/.test(lower)) {
			return 'Urgent assistance is available. Please call immediately: ' + emergencyContactText + ' Our team will respond as quickly as possible.';
		}
		if (/(volunteer|join|become|member|community)/.test(lower)) {
			return 'Thank you for your interest in volunteering or joining APBU Foundation. ' + emergencyContactText + ' Please call for membership and community support details.';
		}
		if (/(contact|phone|number|call)/.test(lower)) {
			return 'You can reach our support team through these emergency contact numbers: ' + emergencyContactText;
		}

		return 'Thank you for reaching out. For immediate assistance, please call: ' + emergencyContactText + ' We are available to support you with general queries, donations, education support, and community assistance.';
	};

	var addChatMessage = function(message, type) {
		var messageClass = type === 'user' ? 'support-chat__message support-chat__message--user' : 'support-chat__message support-chat__message--bot';
		$('#support-chat-widget .support-chat__messages').append('<div class="' + messageClass + '">' + message + '</div>');
		var messagesContainer = $('#support-chat-widget .support-chat__messages');
		messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
	};

	$(document).on('submit', '#support-chat-widget .support-chat__form', function(e) {
		e.preventDefault();
		var input = $('#support-chat-widget .support-chat__input');
		var message = input.val();
		if (!message || !message.trim()) {
			return;
		}
		addChatMessage(message.trim(), 'user');
		input.val('');
		setTimeout(function() {
			addChatMessage(getSupportReply(message), 'bot');
		}, 300);
	});

	$(document).on('click', '#support-chat-widget .support-chat__chip', function() {
		var text = $(this).text();
		$('#support-chat-widget .support-chat__input').val(text).focus();
		$('#support-chat-widget .support-chat__form').trigger('submit');
	});

	$(document).on('click', '#support-chat-widget .support-chat__toggle', function() {
		$('#support-chat-widget').toggle();
		$('.support-chat-icon').toggle();
	});

	$(document).on('click', '.support-chat-icon', function() {
		$('#support-chat-widget').show();
		$('.support-chat-icon').hide();
	});

	var renderNotificationModal = function() {
		if ($('#apbu-notification-modal').length) {
			return;
		}

		var modalMarkup = `
			<div class="notification-modal" id="apbu-notification-modal" role="dialog" aria-modal="true" aria-labelledby="apbu-notification-title">
				<div class="notification-modal__dialog">
					<div class="notification-modal__header">
						<h2 id="apbu-notification-title">Latest Notice</h2>
						<button type="button" class="notification-modal__close" aria-label="Close notification">&times;</button>
					</div>
					<div class="notification-modal__body">
						<div class="notification-modal__badge">Notice</div>
						<h3>${latestNotice.title}</h3>
						<p><strong>Notice Details:</strong> ${latestNotice.details}</p>
						<div class="notification-modal__grid">
							<div>
								<label>Date</label>
								<span>${latestNotice.date}</span>
							</div>
							<div>
								<label>Time</label>
								<span>${latestNotice.time}</span>
							</div>
							<div class="notification-modal__full">
								<label>Venue</label>
								<span>${latestNotice.venue}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		$('body').append(modalMarkup);
	};

	var openNotificationModal = function() {
		renderNotificationModal();
		$('#apbu-notification-modal').addClass('is-open');
		$('body').addClass('notification-modal-open');
	};

	var closeNotificationModal = function() {
		$('#apbu-notification-modal').removeClass('is-open');
		$('body').removeClass('notification-modal-open');
	};

	var ringBell = function() {
		$('.js-notification-bell').addClass('ringing');
		setTimeout(function() {
			$('.js-notification-bell').removeClass('ringing');
		}, 1800);
	};

	$(document).on('click', '.js-notification-bell', function(e) {
		e.preventDefault();
		openNotificationModal();
	});

	$('body').on('click', '#apbu-notification-modal', function(e) {
		if (e.target === this) {
			closeNotificationModal();
		}
	});

	$('body').on('click', '.notification-modal__close', function() {
		closeNotificationModal();
	});

	$(document).on('keydown', function(e) {
		if (e.key === 'Escape' && $('#apbu-notification-modal').length) {
			closeNotificationModal();
		}
	});

	setInterval(ringBell, 2000);

	var privacyPolicyHtml = `
		<p><strong>Last Updated: 15 September 2026</strong></p>
		<p><strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong> ("Foundation", "we", "us" or "our") respects your privacy and is committed to protecting the personal information shared by our donors, members, volunteers, students, beneficiaries, website visitors and other individuals who interact with us.</p>
		<p>This Privacy Policy explains how we collect, use, store and protect personal information through our website, donation facilities and other activities. This policy is intended to comply with applicable Indian laws, including the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and applicable rules and regulations thereunder.</p>
		<h3>1. Information We Collect</h3>
		<p>Depending on your interaction with us, we may collect:</p>
		<ul><li>Name and contact details</li><li>Mobile number, email address and postal address</li><li>Donation and payment-related information</li><li>Details required for issuing donation receipts</li><li>Membership, volunteer or programme-related information</li><li>Information relating to students and beneficiaries where required for our charitable activities</li><li>Communication, enquiries and feedback submitted to us</li><li>Technical information such as IP address, browser type and website usage information, where collected through our website</li></ul>
		<p>We collect only information that is reasonably necessary for the relevant purpose.</p>
		<h3>2. How We Use Your Information</h3>
		<p>We may use personal information to:</p>
		<ul><li>Process and acknowledge donations</li><li>Issue donation receipts and maintain financial records</li><li>Provide educational assistance and charitable support</li><li>Manage members, volunteers and beneficiaries</li><li>Organise educational, cultural, social and awareness programmes</li><li>Respond to enquiries and communicate important information</li><li>Maintain accounting, administrative and statutory records</li><li>Meet applicable legal, regulatory and reporting requirements</li><li>Improve our website and services</li><li>Prevent fraud, misuse or unauthorised activities</li></ul>
		<p>We do not sell or commercially trade your personal information.</p>
		<h3>3. Consent and Lawful Processing</h3>
		<p>Where consent is required under applicable law, we will seek consent in a clear and informed manner and explain the purpose for which personal information is being collected.</p><p>You may withdraw consent where applicable. Withdrawal of consent will not affect processing that is permitted or required under applicable law, or information that we are required to retain for legal, accounting, tax, compliance or other legitimate purposes.</p>
		<h3>4. Donations and Payment Information</h3>
		<p>Donations may be made through the payment options provided on our website or through authorised payment channels.</p><p>Payment transactions may be processed by third-party payment gateways or financial institutions. We do not ordinarily store complete card, UPI, banking or other sensitive payment credentials on our own systems. Such information may be processed by the relevant payment service provider in accordance with its applicable privacy policy and security practices.</p><p>Donors should ensure that the information provided while making a donation is accurate.</p><p>A donation receipt or acknowledgement may be issued based on the information supplied by the donor.</p>
		<h3>5. Donation Terms and Refunds</h3>
		<ul><li>Donations made to the Foundation are voluntary contributions towards its charitable objectives and activities.</li><li>The Foundation does not promise any personal, financial or other benefit in exchange for a donation.</li><li>Once a donation has been successfully processed and acknowledged, a refund request may be considered on a case-by-case basis, subject to applicable law and the terms of the relevant payment gateway.</li><li>Any payment-gateway charges or transaction-related issues may be subject to the policies of the respective payment service provider.</li><li>For questions relating to a donation, donors may contact the Foundation using the details provided below.</li></ul>
		<h3>6. Tax Benefits for Donors</h3>
		<p>Where <strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong> holds a valid approval under <strong>Section 80G of the Income Tax Act, 1961</strong>, eligible donors may claim a deduction for qualifying donations, subject to the applicable provisions, limits and conditions of the Income Tax Act.</p><p>The availability and rate of deduction depend on the donor's eligibility and the applicable category and provisions. Donations made in cash exceeding <strong>&#8377;2,000</strong> are not eligible for deduction under Section 80G.</p><p>Section 80G deduction is also subject to the applicable tax regime and other conditions prescribed under Indian income-tax law. Donors should retain the donation receipt and other relevant documents and claim any eligible deduction in accordance with the law applicable to them.</p><p>Where required, the Foundation may collect and report donor information to the Income Tax Department or other competent authorities in the prescribed manner.</p><p><strong>Tax benefits are subject to applicable law, the Foundation's valid tax approvals and the donor's individual eligibility. Donors should consult a qualified tax professional for advice relating to their individual tax position.</strong></p>
		<h3>7. Information Relating to Children and Students</h3>
		<p>As part of our charitable and educational activities, we may need to collect information relating to students or beneficiaries.</p><p>Where personal information relating to children is collected, we will take appropriate measures and obtain verifiable consent from the parent or lawful guardian wherever required under applicable law.</p><p>We will use such information only for legitimate educational, charitable, administrative or legal purposes and will take reasonable measures to protect it.</p>
		<h3>8. Sharing of Personal Information</h3>
		<p>We may share personal information only where reasonably necessary, including with:</p><ul><li>Authorised payment gateways and financial institutions</li><li>Service providers assisting us with website, technology, accounting or administrative services</li><li>Professional advisers where necessary</li><li>Government departments, regulatory authorities or law-enforcement agencies where required by law</li><li>Other authorised persons where necessary to fulfil a legitimate purpose or legal obligation</li></ul><p>Where third parties process personal information on our behalf, we expect them to maintain appropriate safeguards and use the information only for authorised purposes.</p>
		<h3>9. Data Security</h3><p>We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration, disclosure or destruction.</p><p>However, no method of electronic transmission or storage can be guaranteed to be completely secure. Users should exercise appropriate caution when sharing personal information online.</p>
		<h3>10. Data Retention</h3><p>We retain personal information only for as long as reasonably necessary to fulfil the purpose for which it was collected or to comply with applicable legal, accounting, tax, regulatory and reporting requirements.</p><p>When personal information is no longer required and there is no legal requirement to retain it, we will take reasonable steps to delete or securely dispose of it.</p>
		<h3>11. Your Rights</h3><p>Subject to applicable law, individuals may have the right to:</p><ul><li>Request information regarding the processing of their personal data</li><li>Request correction or updating of inaccurate or incomplete personal information</li><li>Request deletion of personal information where legally applicable</li><li>Withdraw consent where consent is the basis for processing</li><li>Raise a grievance regarding the handling of personal information</li><li>Exercise other rights available under applicable Indian data-protection laws</li></ul><p>Requests may be submitted using the contact details provided below. We may require reasonable information to verify the identity of the person making a request.</p>
		<h3>12. Cookies and Website Technology</h3><p>Our website may use cookies or similar technologies to improve functionality, security and user experience and, where applicable, understand website usage.</p><p>You may be able to manage cookies through your browser settings. Disabling certain cookies may affect some website functionality.</p>
		<h3>13. Third-Party Websites</h3><p>Our website may contain links to third-party websites, payment gateways or other online services. This Privacy Policy does not govern those third-party websites.</p><p>Users should review the privacy policies and terms of the respective third parties before providing personal information or making transactions through their platforms.</p>
		<h3>14. Changes to This Privacy Policy</h3><p>We may update this Privacy Policy from time to time to reflect changes in our activities, technology or applicable laws and regulations.</p><p>Any revised Privacy Policy will be published on this page along with the updated <strong>"Last Updated"</strong> date.</p>
		<h3>15. Contact and Grievances</h3><p>If you have any questions, concerns, requests or complaints regarding your personal information, donations or this Privacy Policy, please contact us:</p><p><strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong><br><strong>Address:</strong> S/137, Mitra Compound, Station Road, Midnapore, Dist. Paschim Medinipur, PIN - 721101, West Bengal, India</p><p><strong>Phone:</strong><br>7872136484<br>7001682789<br>9564023889<br>9932905220</p><p><strong>Website:</strong> <a href="https://www.apbufoundation.org/?utm_source=chatgpt.com" target="_blank" rel="noopener">www.apbufoundation.org</a></p><p><strong>Email:</strong> Official Email Address</p><p>We will review and address privacy-related requests and grievances in accordance with applicable law.</p>
		<h3>Our Commitment</h3><p>At <strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong>, we believe that trust is at the heart of every charitable relationship. Whether you are a donor, member, volunteer, student, beneficiary or supporter, we are committed to handling your information responsibly, transparently and with due care while pursuing our educational and charitable objectives.</p>`;

	var termsOfServiceHtml = `
		<p><strong>Last Updated: 15 September 2026</strong></p>
		<p>Welcome to the official website of <strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong> ("Foundation", "we", "us" or "our").</p>
		<p>By accessing or using our website, making a donation, submitting an enquiry, registering for a programme, becoming a member or otherwise interacting with our online services, you agree to these Terms of Service. If you do not agree with these Terms, please do not use the website or its services.</p>
		<h3>1. About the Foundation</h3><p>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION is a charitable organisation working towards educational, social and community development, particularly supporting deserving and economically disadvantaged students and promoting education, talent, awareness and social welfare.</p><p><strong>Registered Address:</strong><br>S/137, Mitra Compound, Station Road, Midnapore, Dist. Paschim Medinipur, PIN - 721101, West Bengal, India</p><p><strong>Contact Numbers:</strong><br>7872136484 | 7001682789 | 9564023889 | 9932905220</p><p><strong>Website:</strong> <a href="https://www.apbufoundation.org/?utm_source=chatgpt.com" target="_blank" rel="noopener">www.apbufoundation.org</a></p>
		<h3>2. Acceptance of Terms</h3><p>By using this website, you confirm that:</p><ul><li>You have read and understood these Terms of Service.</li><li>The information you provide to the Foundation is accurate and complete to the best of your knowledge.</li><li>You will use the website only for lawful purposes.</li><li>You will not use the website in a manner that may harm the Foundation, its beneficiaries, donors, members, volunteers or other users.</li></ul><p>We may update these Terms from time to time. Continued use of the website after an updated version is published constitutes acceptance of the revised Terms.</p>
		<h3>3. Use of the Website</h3><p>You agree not to:</p><ul><li>Use the website for any unlawful, fraudulent or unauthorised purpose.</li><li>Attempt to gain unauthorised access to the website, server or related systems.</li><li>Upload or transmit malicious software, viruses or harmful code.</li><li>Misrepresent your identity or provide false information.</li><li>Copy, reproduce, modify or distribute website content without appropriate permission.</li><li>Use information obtained from the website to harass, harm or exploit another person.</li><li>Interfere with the security, functionality or normal operation of the website.</li><li>Use the Foundation's name, logo, content or materials in a misleading manner.</li></ul><p>The Foundation reserves the right to restrict or terminate access where a user violates these Terms or applicable law.</p>
		<h3>4. Donations</h3><p>The Foundation may provide facilities through which individuals, organisations or other eligible persons can make voluntary donations.</p><p>All donations are voluntary contributions intended to support the charitable objectives and activities of the Foundation.</p><p>By making a donation, you confirm that:</p><ul><li>The funds are legally obtained and you are authorised to make the donation.</li><li>The information provided during the transaction is accurate.</li><li>You understand that a donation does not create an ownership interest, partnership, employment relationship or other financial interest in the Foundation.</li><li>The Foundation does not guarantee any specific personal, financial or other benefit in exchange for a donation.</li></ul><p>The Foundation may use donations towards its charitable programmes, educational assistance, administrative requirements and other lawful activities consistent with its objectives.</p>
		<h3>5. Online Payments</h3><p>Online payments may be processed through third-party payment gateways, banks or other authorised payment service providers.</p><p>The Foundation does not ordinarily have access to or store complete card numbers, PINs, passwords or other payment credentials processed by the relevant payment provider.</p><p>Users must review the applicable terms of the payment service provider before completing a transaction.</p><p>The Foundation is not responsible for temporary payment-gateway failures, banking network interruptions or other technical issues outside its reasonable control.</p>
		<h3>6. Donation Receipts and Tax Benefits</h3><p>Where applicable, the Foundation may issue a donation receipt based on the information provided by the donor.</p><p>Where the Foundation has a valid approval under <strong>Section 80G of the Income Tax Act, 1961</strong>, eligible donors may be entitled to claim a deduction for qualifying donations, subject to the conditions, limits and requirements prescribed under applicable income-tax law.</p><p>The availability of any tax benefit depends upon the Foundation's valid tax status, the nature and mode of the donation and the individual donor's eligibility.</p><p>Donors are responsible for providing accurate information and claiming any eligible tax benefit in accordance with applicable law.</p><p>The Foundation does not guarantee that a particular donor will receive a particular tax benefit.</p>
		<h3>7. Donation Refunds and Transaction Issues</h3><p>Donations are generally voluntary contributions and are not purchases of goods or services.</p><p>Where a donor believes that a transaction was made in error, duplicated, unauthorised or incorrectly processed, the donor should contact the Foundation as soon as reasonably possible with the relevant transaction details.</p><p>Refund requests, where applicable, will be reviewed on a case-by-case basis, subject to applicable law, the circumstances of the transaction and the terms of the relevant payment service provider.</p>
		<h3>8. Programmes and Beneficiary Support</h3><p>The Foundation may conduct educational, charitable, cultural, awareness, community-development and other welfare programmes.</p><p>Participation in a programme does not automatically guarantee financial assistance, admission, scholarship, employment, membership or any other benefit.</p><p>Selection of beneficiaries or participants may depend on eligibility, available resources, programme objectives, documentation and other criteria determined by the Foundation.</p><p>The Foundation reserves the right to modify, postpone or discontinue a programme where reasonably necessary.</p>
		<h3>9. Website Content</h3><p>The information published on this website is provided primarily for general informational and charitable purposes.</p><p>Although we make reasonable efforts to maintain accurate and updated information, the Foundation does not guarantee that every item of website content will always be complete, current or error-free.</p><p>Programme details, activities, photographs, reports, announcements, statistics and other information may be updated or changed without prior notice.</p>
		<h3>10. Intellectual Property</h3><p>Unless otherwise stated, the website and its content - including text, photographs, graphics, logos, designs, reports, publications and other materials - belong to or are used lawfully by the Foundation.</p><p>You may view and use the website for personal, non-commercial and lawful purposes.</p><p>You may not reproduce, modify, publish, distribute, commercially exploit or create derivative works from Foundation content without prior written permission, except where permitted by applicable law.</p><p>The Foundation's name and logo may not be used in a manner that suggests an unauthorised partnership, sponsorship, endorsement or affiliation.</p>
		<h3>11. User-Submitted Information</h3><p>If you voluntarily submit information, feedback, photographs, comments, testimonials or other material to the Foundation, you confirm that:</p><ul><li>The information is truthful and does not knowingly violate another person's rights.</li><li>You have the necessary authority or permission to submit the material.</li><li>The material does not contain unlawful, defamatory, threatening or malicious content.</li></ul><p>The Foundation may use authorised submissions for legitimate organisational, communication, documentation or awareness purposes, subject to applicable law and our Privacy Policy.</p>
		<h3>12. Privacy and Personal Data</h3><p>Your use of the website is also subject to our <strong>Privacy Policy</strong>, which explains how we collect, use, store, protect and process personal information.</p><p>We handle personal information in accordance with applicable Indian data-protection requirements, including the <strong>Digital Personal Data Protection Act, 2023</strong> and applicable rules when and to the extent they apply.</p><p>Please read our Privacy Policy before submitting personal information through the website.</p>
		<h3>13. Children and Minors</h3><p>Our activities may involve children and students as beneficiaries.</p><p>The website should not be used by children to independently provide personal information where parental or lawful guardian involvement is required by applicable law.</p><p>Where information relating to children is collected for legitimate charitable or educational purposes, the Foundation will take appropriate measures and obtain required consent from a parent or lawful guardian.</p>
		<h3>14. Third-Party Links</h3><p>The website may contain links to third-party websites, payment gateways, social-media platforms or other external services.</p><p>Such links are provided for convenience or information. The Foundation does not control third-party websites and is not responsible for their content, availability, security, privacy practices or terms.</p><p>Users should review the terms and privacy policies of third-party websites before using their services.</p>
		<h3>15. Prohibited Activities</h3><p>You must not use the website to:</p><ul><li>Commit or facilitate any offence.</li><li>Defraud or mislead the Foundation or another person.</li><li>Attempt unauthorised access to computer systems or accounts.</li><li>Introduce viruses, malware or harmful code.</li><li>Collect another person's personal information without lawful authority.</li><li>Publish or transmit content that is unlawful, defamatory, obscene, threatening or harmful.</li><li>Violate intellectual-property, privacy or other legal rights.</li><li>Disrupt or interfere with the website or its security.</li><li>Impersonate the Foundation, its representatives, members, volunteers or beneficiaries.</li></ul><p>The Foundation may take appropriate action where prohibited activity is detected or reported.</p>
		<h3>16. Website Availability</h3><p>We endeavour to keep the website available and functional but do not guarantee uninterrupted or error-free access.</p><p>The website may occasionally be unavailable because of maintenance, technical problems, security measures, updates, hosting issues, telecommunications failures or circumstances beyond our reasonable control.</p>
		<h3>17. Disclaimer</h3><p>The Foundation provides its website and online facilities on an "as available" basis.</p><p>To the extent permitted by law, we do not warrant that:</p><ul><li>The website will always be available or uninterrupted.</li><li>The website will be completely free from errors or technical issues.</li><li>All information will always be current or complete.</li><li>External websites linked from our website will remain available or accurate.</li></ul><p>Nothing in these Terms is intended to exclude any liability or legal right that cannot lawfully be excluded under applicable Indian law.</p>
		<h3>18. Limitation of Liability</h3><p>To the extent permitted by applicable law, the Foundation shall not be responsible for indirect, incidental or consequential losses arising from the use of the website, interruption of services, third-party services or events beyond the Foundation's reasonable control.</p><p>Nothing in these Terms limits liability where such limitation is prohibited by applicable law.</p>
		<h3>19. Indemnification</h3><p>To the extent permitted by applicable law, you agree to be responsible for losses, claims, liabilities or expenses arising from your unlawful use of the website, violation of these Terms, infringement of another person's rights or misuse of Foundation services.</p>
		<h3>20. Compliance with Indian Law</h3><p>Users must comply with all applicable laws while accessing or using this website.</p><p>These Terms are intended to operate subject to applicable Indian laws, including relevant provisions of the <strong>Information Technology Act, 2000</strong>, applicable Information Technology Rules, data-protection laws and other laws and regulations applicable to the Foundation and its activities. MeitY publishes the applicable IT Act and Rules and related official guidance.</p><p>Where applicable to a particular transaction or activity, the rights and protections available under the <strong>Consumer Protection Act, 2019</strong> and related rules will also apply.</p>
		<h3>21. Governing Law and Jurisdiction</h3><p>These Terms shall be governed by and interpreted in accordance with the laws of India.</p><p>Subject to applicable law, courts having appropriate jurisdiction in <strong>West Bengal</strong> shall have jurisdiction over disputes arising from the use of this website or these Terms.</p><p>Nothing in this clause prevents a person from exercising any statutory right or remedy available under applicable Indian law.</p>
		<h3>22. Grievances and Contact</h3><p>For questions, complaints, donation-related issues or concerns regarding these Terms or the Foundation's online services, please contact:</p><p><strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong><br><strong>Address:</strong> S/137, Mitra Compound, Station Road, Midnapore, Dist. Paschim Medinipur, PIN - 721101, West Bengal, India<br><strong>Phone:</strong> 7872136484 | 7001682789 | 9564023889 | 9932905220<br><strong>Website:</strong> <a href="https://www.apbufoundation.org/?utm_source=chatgpt.com" target="_blank" rel="noopener">www.apbufoundation.org</a><br><strong>Email:</strong> Official Email Address</p><p>We will make reasonable efforts to review and respond to legitimate complaints and requests within the time prescribed by applicable law.</p>
		<h3>23. Changes to These Terms</h3><p>The Foundation may revise these Terms from time to time to reflect changes in its activities, website functionality or applicable laws and regulations.</p><p>The revised Terms will be published on this page with a new <strong>"Last Updated"</strong> date. Your continued use of the website after such changes means that you accept the revised Terms.</p>
		<h3>24. Entire Agreement</h3><p>These Terms, together with the Foundation's Privacy Policy and any other policies expressly referred to on the website, constitute the terms governing your use of the Foundation's website and online services.</p><p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.</p><p><strong>By accessing or using this website, you acknowledge that you have read, understood and agreed to these Terms of Service.</strong></p><p><strong>ARANYANCHAL PRATIVA BIKASH UDYOG FOUNDATION</strong><br><em>Working towards education, empowerment and community development.</em></p>`;

	$('.privacy-policy-link').on('click', function(e) {
		e.preventDefault();
		if (!document.getElementById('privacy-policy')) {
			$('body').append('<div class="privacy-modal" id="privacy-policy" role="dialog" aria-modal="true" aria-labelledby="privacy-policy-title"><div class="privacy-modal__dialog"><div class="privacy-modal__header"><h2 id="privacy-policy-title">Privacy Policy</h2><button type="button" class="privacy-modal__close" aria-label="Close privacy policy">&times;</button></div><div class="privacy-modal__body">' + privacyPolicyHtml + '</div></div></div>');
		}
		$('#privacy-policy').addClass('is-open');
		$('body').css('overflow', 'hidden');
	});

	$('.terms-of-service-link').on('click', function(e) {
		e.preventDefault();
		if (!document.getElementById('terms-of-service')) {
			$('body').append('<div class="privacy-modal" id="terms-of-service" role="dialog" aria-modal="true" aria-labelledby="terms-of-service-title"><div class="privacy-modal__dialog"><div class="privacy-modal__header"><h2 id="terms-of-service-title">Terms of Service</h2><button type="button" class="privacy-modal__close" aria-label="Close terms of service">&times;</button></div><div class="privacy-modal__body">' + termsOfServiceHtml + '</div></div></div>');
		}
		$('#terms-of-service').addClass('is-open');
		$('body').css('overflow', 'hidden');
	});

	$('body').on('click', '.privacy-modal__close, .privacy-modal', function(e) {
		if (e.target === this) {
			$('#privacy-policy').removeClass('is-open');
			$('#terms-of-service').removeClass('is-open');
			$('body').css('overflow', '');
		}
	});
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape') {
			$('#privacy-policy').removeClass('is-open');
			$('#terms-of-service').removeClass('is-open');
			$('body').css('overflow', '');
		}
	});

	$(window).on('load', function() {
		var pageLoader = document.getElementById('page-loader');

		if (pageLoader) {
			setTimeout(function() {
				pageLoader.classList.add('is-loaded');
			}, 4000);
		}
	});

	// $(".loader").delay(1000).fadeOut("slow");
 //  $("#overlayer").delay(1000).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	

	var siteCarousel = function () {
		if ( $('.apbu-gallery').length > 0 ) {
			$('.apbu-gallery').owlCarousel({
				items: 3,
				loop: true,
				margin: 18,
				nav: false,
				dots: true,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				smartSpeed: 700,
				responsive: {
					0: { items: 1 },
					768: { items: 3 }
				}
			});
			$('.apbu-gallery-control--prev').on('click', function() {
				$('.apbu-gallery').trigger('prev.owl.carousel');
			});
			$('.apbu-gallery-control--next').on('click', function() {
				$('.apbu-gallery').trigger('next.owl.carousel');
			});
		}

		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    smartSpeed: 1000,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 0,
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        },
	        1200:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 3
	        }
		    }
			});
		}

		let owl2 = $('.slide-one-item-alt-text').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoplay: true,
	    pauseOnHover: true,
	    onDragged: function(event) {
	    	console.log('event : ',event.relatedTarget['_drag']['direction'])
	    	if ( event.relatedTarget['_drag']['direction'] == 'left') {
	    		$('.owl-1').trigger('next.owl.carousel');
	    	} else {
	    		$('.owl-1').trigger('prev.owl.carousel');
	    	}
	    }
	  });

		let owl = $('.owl-1').owlCarousel({
			// animateOut: 'fadeOut',
			center: true,
			items: 1,
			loop: true,
			margin: 0,
			smartSpeed: 1500,
			dots: true,
	    autoplay: true,
	    pauseOnHover: false,
	    onDragged: function(event) {
	    	console.log('event : ',event.relatedTarget['_drag']['direction'])
	    	if ( event.relatedTarget['_drag']['direction'] == 'left') {
	    		$('.slide-one-item-alt-text').trigger('next.owl.carousel');
	    	} else {
	    		$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
	    	}
	    }
		})

		$( '.owl-dot' ).on( 'click', function() {
		  console.log(owl2.trigger('to.owl.carousel', $(this).index()));
		})




		$('.owl-2').owlCarousel({
			animateOut: 'fadeOut',
			center: true,
			items: 1,
			loop: true,
			margin: 0,
			smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false
		});
		$('.owl-3').owlCarousel({
			animateOut: 'fadeOut',
			center: true,
			items: 1,
			loop: true,
			margin: 0,
			smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false
		})

		$('.slide-one-item').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false,
	    dots: true,
	    nav: false,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });


	  

	  $('.slide-one-item-alt').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoplay: true,
	    pauseOnHover: true,
	    onDragged: function(event) {
	    	console.log('event : ',event.relatedTarget['_drag']['direction'])
	    	if ( event.relatedTarget['_drag']['direction'] == 'left') {
	    		$('.slide-one-item-alt-text').trigger('next.owl.carousel');
	    	} else {
	    		$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
	    	}
	    }
	  });

	  if ( $('.owl-all').length > 0 ) {
			$('.owl-all').owlCarousel({
		    center: false,
		    items: 1,
		    loop: false,
				stagePadding: 0,
		    margin: 0,
		    autoplay: false,
		    nav: false,
		    dots: true,
		    touchDrag: true,
  			mouseDrag: true,
  			smartSpeed: 1000,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        768:{
	        	margin: 30,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	          items: 1
	        },
	        992:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	        	touchDrag: false,
  					mouseDrag: false,
	          items: 3
	        },
	        1200:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	        	touchDrag: false,
  					mouseDrag: false,
	          items: 3
	        }
		    }
			});
		}
		
	};
	siteCarousel();

	

	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	// siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	// siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');

   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 50
      }, 600, 'easeInOutExpo', function() {
        // window.location.hash = hash;

      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();


  var counter = function() {
		
		$('#about-section').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number > span').each(function(){
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();



});