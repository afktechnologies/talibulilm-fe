import Image from "next/image";
import styles from "./donation.module.css";
import donationHero from "../../../public/Images/donation/hero.png";
import qrCode from "../../../public/Images/donation/qr-code.png";
import readingQuran from "../../../public/Images/donation/reading-quran.png";
import polygon1 from "../../../public/Images/donation/polygon-1.png";
import polygon2 from "../../../public/Images/donation/polygon-2.png";
import polygon3 from "../../../public/Images/donation/polygon-3.png";
import polygon4 from "../../../public/Images/donation/polygon-4.png";

export default function DonationPage() {
  return (
    <div className={styles.page}>

      {/* ═══════════════════════════════════════
          HERO / QUOTE SECTION
      ═══════════════════════════════════════ */}
      <section className={styles.heroSection}>
        {/* Decorative background geometry */}
        <div className={styles.heroBgCircle1} />
        <div className={styles.heroBgCircle2} />
        <div className={styles.heroBgDots} />

        <div className={styles.heroCard}>
          {/* Gold accent bar on left edge */}
          <div className={styles.heroCardAccent} />

          <div className={styles.heroIllustration}>
            <div className={styles.heroImgRing} />
            <Image
              src={donationHero}
              alt="Family giving charity illustration"
              width={320}
              height={280}
              className={styles.heroImg}
            />
          </div>

          <div className={styles.heroText}>
            <span className={styles.heroEyebrow}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
              </svg>
              Hadith of the Prophet ﷺ
            </span>

            <blockquote className={styles.quoteText}>
              &ldquo;When a man dies, his acts come to an end, except for three —
              recurring charity, or knowledge by which people benefit, or a
              pious child who prays for him.&rdquo;
            </blockquote>

            <div className={styles.quoteSourceRow}>
              <div className={styles.quoteSourceLine} />
              <p className={styles.quoteSource}>Sahih Muslim — 1631</p>
              <div className={styles.quoteSourceLine} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MILESTONES SECTION
      ═══════════════════════════════════════ */}
      <section className={styles.milestones}>
        <div className={styles.sectionLabel}>What We&apos;ve Built</div>
        <h2 className={styles.milestonesHeading}>
          Our Important{" "}
          <em className={styles.milestonesSubHeading}>Milestones</em>
        </h2>
        <p className={styles.milestonesSubText}>
          Alhamdulillah — here&apos;s what your support has helped us achieve so far.
        </p>

        <div className={styles.milestonesGrid}>
          {[
            {
              title: "Quran",
              icon: "quran-icon.png",
              desp: "Quran with tafseer and translation",
              num: "01",
              color: "#e8f5e9",
              accent: "#2e7d32",
            },
            {
              title: "Hadith",
              icon: "hadith-icon.png",
              desp: "Authentic sunnah of the Prophet (S.A.W)",
              num: "02",
              color: "#fff8e1",
              accent: "#f57f17",
            },
            {
              title: "Supplications",
              icon: "supplication-icon.png",
              desp: "Prophetic dua and prayers for daily life",
              num: "03",
              color: "#e3f2fd",
              accent: "#1565c0",
            },
          ].map((item) => (
            <div key={item.title} className={styles.milestoneCard}>
              <div className={styles.milestoneNumTag}>{item.num}</div>
              <div
                className={styles.milestoneIconWrap}
                style={{ background: item.color }}
              >
                <Image
                  src={`/Images/donation/${item.icon}`}
                  alt={item.title}
                  width={46}
                  height={46}
                />
              </div>
              <h3
                className={styles.milestoneTitle}
                style={{ color: item.accent }}
              >
                {item.title}
              </h3>
              <p className={styles.milestoneDesc}>{item.desp}</p>
              <div
                className={styles.milestoneBar}
                style={{ background: item.accent }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SUPPORT BANNER
      ═══════════════════════════════════════ */}
      <section className={styles.supportBanner}>
        {/* Layered background decorations */}
        <div className={styles.supportBgPattern} />
        <div className={styles.supportBgGlow} />

        <div className={styles.supportInner}>
          <div className={styles.supportLeft}>
            <span className={styles.supportEyebrow}>Our Mission</span>
            <h2 className={styles.supportTitle}>
              <em>Support us,</em>
              <span className={styles.supportSubtitle}>We need your help</span>
            </h2>

            <div className={styles.supportDivider} />

            <p className={styles.supportDesc}>
              Allahumdulillah, with the mercy of Allah, Talibulilm.in has
              reached an important milestone. Our Qur&apos;an and Hadith sections
              are close to completion, and our aim is to provide Muslims around
              the world with authentic Islamic knowledge based on the Qur&apos;an
              and Sunnah upon the Manhaj of the Salaf.
            </p>

            {/* Impact stats row */}
            <div className={styles.supportStats}>
              {[
                { val: "10K+", label: "Monthly Readers" },
                { val: "500+", label: "Resources" },
                { val: "3+",   label: "Years Online" },
              ].map((s) => (
                <div key={s.label} className={styles.supportStat}>
                  <span className={styles.supportStatVal}>{s.val}</span>
                  <span className={styles.supportStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.supportRight}>
            <div className={styles.supportImgFrame}>
              <div className={styles.supportImgGlow} />
              <Image
                src={readingQuran}
                alt="Person reading Quran"
                width={400}
                height={400}
                className={styles.supportIllustration}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WITH YOUR SUPPORT — GOALS
      ═══════════════════════════════════════ */}
      <section className={styles.supportGoals}>
        <div className={styles.goalsTopAccent} />

        <div className={styles.sectionLabel} style={{ color: "#c9a227" }}>
          Your Impact
        </div>
        <h2 className={styles.goalsHeading}>
          <em>With your Support,</em>
          <span className={styles.goalsHighlight}> We will:</span>
        </h2>

        <div className={styles.goalsGrid}>
          {/* Row 1 */}
          <div className={styles.goalItem}>
            <div className={styles.goalTextWrap}>
              <span className={styles.goalNumber}>01</span>
              <p className={styles.goalText}>
                Expand Qur&apos;an Tafseer and Hadith resources
              </p>
            </div>
            <div className={styles.goalDiamond}>
              <Image src={polygon1} alt="Expand Quran resources" width={120} height={120} />
            </div>
          </div>

          <div className={styles.goalItem}>
            <div className={styles.goalDiamond}>
              <Image src={polygon2} alt="Q&A section" width={120} height={120} />
            </div>
            <div className={styles.goalTextWrap}>
              <span className={styles.goalNumber}>02</span>
              <p className={styles.goalText}>
                Introduce a Q&amp;A section for Islamic questions with
                evidence-based answers
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.goalItem}>
            <div className={styles.goalTextWrap}>
              <span className={styles.goalNumber}>03</span>
              <p className={styles.goalText}>
                Add authentic biographies and scholarly content
              </p>
            </div>
            <div className={styles.goalDiamond}>
              <Image src={polygon3} alt="Scholarly content" width={120} height={120} />
            </div>
          </div>

          <div className={styles.goalItem}>
            <div className={styles.goalDiamond}>
              <Image src={polygon4} alt="Website maintenance" width={120} height={120} />
            </div>
            <div className={styles.goalTextWrap}>
              <span className={styles.goalNumber}>04</span>
              <p className={styles.goalText}>
                Maintain and enhance the website for long-term benefit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT & DONATE SECTION
      ═══════════════════════════════════════ */}
      <section className={styles.contactSection}>
        <div className={styles.contactOrb1} />
        <div className={styles.contactOrb2} />

        <div className={styles.contactInner}>

          {/* Left — text + WhatsApp CTA */}
          <div className={styles.contactLeft}>
            <span className={styles.contactEyebrow}>✦ &nbsp;Get in Touch</span>

            <h2 className={styles.contactHeading}>
              Have questions about <br />
              <em className={styles.contactHeadingGold}>donating?</em>
            </h2>

            <p className={styles.contactDesc}>
              For any queries regarding donations, collaborations, or our
              learning resources, reach out to us directly. We&apos;re happy to
              guide you through the process — In Sha Allah.
            </p>

            <div className={styles.contactDivider} />

            <a
              href="https://wa.me/917219485252"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <span className={styles.whatsappIconWrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                  width="26" height="26" fill="currentColor" aria-hidden="true">
                  <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.797 1.783 6.81L2 30l7.393-1.742A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.394a11.33 11.33 0 0 1-5.79-1.587l-.414-.247-4.388 1.034 1.063-4.265-.27-.437A11.367 11.367 0 0 1 4.61 16.003c0-6.285 5.108-11.394 11.393-11.394 6.284 0 11.393 5.11 11.393 11.394 0 6.285-5.11 11.391-11.393 11.391zm6.254-8.528c-.343-.172-2.03-1.002-2.344-1.116-.315-.115-.544-.172-.773.172-.229.343-.886 1.116-1.086 1.345-.2.23-.4.258-.743.086-.343-.172-1.449-.534-2.76-1.703-1.02-.91-1.708-2.035-1.909-2.378-.2-.343-.021-.528.15-.699.155-.153.343-.4.515-.6.172-.2.229-.343.343-.572.115-.23.057-.43-.029-.6-.086-.172-.773-1.862-1.058-2.549-.279-.67-.562-.578-.773-.589l-.658-.01c-.229 0-.6.086-.915.43-.315.343-1.2 1.172-1.2 2.857 0 1.685 1.229 3.313 1.4 3.542.172.23 2.42 3.693 5.864 5.18.82.354 1.458.565 1.957.722.823.261 1.572.225 2.163.136.66-.099 2.03-.83 2.316-1.632.286-.8.286-1.487.2-1.632-.086-.143-.315-.229-.658-.4z" />
                </svg>
              </span>
              <div className={styles.whatsappTextBlock}>
                <span className={styles.whatsappLabel}>Message us on WhatsApp</span>
                <span className={styles.whatsappNumber}>+91 72194 85252</span>
              </div>
              <svg className={styles.whatsappArrow} width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <p className={styles.contactNote}>
              We typically respond within a few hours
            </p>
          </div>

          {/* Right — QR donate card */}
          <div className={styles.contactRight}>
            <div className={styles.donateCard}>
              <div className={styles.donateCardTop}>
                <span className={styles.donateCardBadge}>Direct Donation</span>
                <h3 className={styles.donateCardTitle}>Scan &amp; Pay</h3>
                <p className={styles.donateCardSub}>
                  Use any UPI app to scan the QR and donate instantly.
                </p>
              </div>

              <div className={styles.qrWrapper}>
                <div className={styles.qrGlow} />
                <Image src={qrCode} alt="Donation QR Code"
                  width={175} height={175} className={styles.qrImg} />
              </div>

              <div className={styles.upiList}>
                <div className={styles.upiChip}>
                  <span className={styles.upiChipLabel}>UPI ID</span>
                  <span className={styles.upiChipValue}>talibulilm@indie</span>
                </div>
                <div className={styles.upiChip}>
                  <span className={styles.upiChipLabel}>PhonePe / Paytm</span>
                  <span className={styles.upiChipValue}>7219485252</span>
                </div>
              </div>

              <div className={styles.donateCardFooter}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Secure &amp; instant UPI transfer</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}